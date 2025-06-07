const express = require('express');
const router = express.Router();
const { register, forgotPassword, resetPassword } = require('../controllers/userController');

// Register route
router.post('/register', register);

// Forgot password route
router.post('/forgot-password', forgotPassword);

// Reset password route
router.post('/reset-password/:token', resetPassword);

console.log('🛣️ userRoutes loaded');


module.exports = router;
