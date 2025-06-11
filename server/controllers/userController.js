const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../utils/mailer');

// @desc    Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email.' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

// @desc    Login user and return JWT
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('📥 Login attempt:', email);

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await user.comparePassword(password))) {
      console.log('❌ Invalid credentials');
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
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
};

// @desc    Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log('📨 Forgot password request for:', email);

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.warn('⚠️ No user found for:', email);
      return res.status(200).json({
        message: 'If a user with that email exists, a password reset link has been sent.',
      });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.BASE_CLIENT_URL}/reset-password/${rawToken}`;
    if (process.env.NODE_ENV !== 'production') {
      console.log('🔗 Password reset URL:', resetUrl);
    }

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      html: `
        <h2>Password Reset</h2>
        <p>You requested to reset your password. Click the link below:</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
        <p><strong>This link will expire in 1 hour.</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: 'If a user with that email exists, a password reset link has been sent.',
    });
  } catch (err) {
    console.error('❌ Forgot password error:', err);
    res.status(500).json({ message: 'Server error during password reset request.' });
  }
};

// @desc    Reset Password
exports.resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const token = req.params.token;

  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired password reset token.' });
    }

    user.password = newPassword; // schema pre-save hook handles hashing
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('❌ Reset password error:', error);
    res.status(500).json({ message: 'Server error during password reset.' });
  }
};

// @desc    Get User Profile (Protected Route)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error('❌ Profile fetch error:', err);
    res.status(500).json({ message: 'Server error fetching profile.' });
  }
};
