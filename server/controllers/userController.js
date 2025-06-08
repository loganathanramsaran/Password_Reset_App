const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const transporter = require('../utils/mailer');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('📥 Login attempt:', email);

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log('❌ User not found');
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      console.log('❌ Password mismatch');
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email: email.toLowerCase() });

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email.' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password, // plain password, will be hashed in schema
    });

    res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log('📨 Forgot password called for:', email);

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.warn('⚠️ User not found for email:', email);
      return res.status(200).json({
        message: 'If a user with that email exists, a password reset link has been sent.',
      });
    }

    console.log('✅ User found:', user.email);

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save({ validateBeforeSave: false }); // ✅ Bypass validation

    const resetUrl = `${process.env.BASE_CLIENT_URL}/reset-password/${rawToken}`;
    console.log('🔗 Reset URL:', resetUrl);

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      html: `
        <h3>Password Reset</h3>
        <p>You requested a password reset for <strong>${user.email}</strong>.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
        <p>Reset Token (for dev/debug): <code>${rawToken}</code></p>
      `
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('📧 Email sent:', info.response);
    } catch (emailErr) {
      console.error('❌ Error sending email:', emailErr);
      return res.status(500).json({ message: 'Error sending password reset email.' });
    }

    res.status(200).json({
      message: 'If a user with that email exists, a password reset link has been sent.',
    });

  } catch (err) {
    console.error('❌ Forgot password error:', err);
    res.status(500).json({ message: 'Server error during password reset request.' });
  }
};

exports.resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const token = req.params.token;

  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired password reset token.' });
    }

    user.password = newPassword; // Let the pre-save hook handle hashing
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('❌ Reset password error:', error);
    res.status(500).json({ message: 'Server error during password reset.' });
  }
};

// @route GET /api/users/profile
// @access Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error('❌ Profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
