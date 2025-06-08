const express = require('express');
const router = express.Router();
const { register, login, getProfile, forgotPassword, resetPassword } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Registration and Login
router.post('/register', register);
router.post('/login', login);

// Profile Route (Protected)
router.get('/profile', protect, getProfile); // ✅ must match frontend GET /users/profile

// Password Reset
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
