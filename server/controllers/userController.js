const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const transporter = require('../utils/mailer');

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};


// @route POST /api/users/forgot-password
// @desc Handle forgot password request
// @access Public
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
   console.log('📨 Forgot password called for:', email);

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log('⚠️ User not found for email:', email);
      return res.status(200).json({
        message: 'If a user with that email exists, a password reset link has been sent.',
      });
    }

    console.log('✅ User found:', user.email);

    // Create reset token
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Construct reset URL
    const resetUrl = `${process.env.BASE_CLIENT_URL}/reset-password/${rawToken}`;

    // ✅ Log it for debugging
    console.log('🔗 Reset URL:', resetUrl);

    const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: 'Password Reset Request',
    text: `Reset your password using this link: ${resetUrl}`,
    html: `
        <h3>Password Reset</h3>
        <p>You "${user.email}" requested a password reset.</p>
        <p>Click below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link expires in 1 hour.</p>
        <p>If you did not request this, you can ignore this email.</p>
        <p>Your Reset Password Token : ${rawToken}</p>
    `,
    };

    // Send email
    try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending password reset email.' });
    }



    res.status(200).json({
      message: 'If a user with that email exists, a password reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error during password reset request.' });
  }
};

// @route POST /api/users/reset-password/:token
// @desc Handle password reset request
// @access Public
exports.resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error during password reset.' });
  }
};
