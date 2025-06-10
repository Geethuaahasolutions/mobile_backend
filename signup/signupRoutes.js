const express = require('express');
const SignupController = require('./signupController');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Add this line

const router = express.Router();
const signupController = new SignupController();

// Ensure avatars directory exists
const avatarsDir = path.join(__dirname, '../uploads/avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Multer setup for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, avatarsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/', signupController.createUser); 
router.post('/update-profile', upload.single('avatar'), signupController.updateProfile);
router.get('/profile', signupController.getProfile);

module.exports = router;