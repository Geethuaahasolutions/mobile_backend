const UserModel = require('./signupModels');

class SignupController {
    async createUser(req, res) {
        const { username, email_id, password, confirm_password } = req.body;

        if (!username || !email_id || !password || !confirm_password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirm_password) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        try {
            const newUser = await UserModel.create({ username, email_id, password, confirm_password });
            return res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            return res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    }

    async updateProfile(req, res) {
        const { email_id, dob, ph_no, address } = req.body;
        if (!email_id) {
            return res.status(400).json({ message: 'Email is required' });
        }
        try {
            await UserModel.updateProfile({ email_id, dob, ph_no, address });
            return res.json({ message: 'Profile updated successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating profile', error: error.message });
        }
    }
}

module.exports = SignupController;