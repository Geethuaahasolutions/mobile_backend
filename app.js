require('dotenv').config();
const express = require('express');
const signupRoutes = require('./signup/signupRoutes'); 
const loginRoutes = require('./login/loginRoutes');
const forgotRoutes = require('./forgot/forgotRoutes');
const uploadRoutes = require('./uploadvideo/uploadRoutes');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());


const path = require('path');
// Serve videos folder statically for actual video file access
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// console.log('Serving videos from:', path.join(__dirname, 'videos'));

app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/forgot', forgotRoutes);
app.use('/videos', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});