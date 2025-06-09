const express = require('express');
const forgotController = require('./forgotController');
const router = express.Router();

router.post('/send-otp', forgotController.sendOTP);
router.post('/verify-otp', forgotController.verifyOTP);
router.post('/reset-password', forgotController.resetPassword);

module.exports = router;