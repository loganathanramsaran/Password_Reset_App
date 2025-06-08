const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword } = require('../controllers/userController');

// Register
router.post('/register', register);

// ✅ Login route (was missing)
router.post('/login', login);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password
router.post('/reset-password/:token', resetPassword);

console.log('🛣️ userRoutes loaded');
module.exports = router;
