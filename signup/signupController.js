const UserModel = require('./signupModels');

class SignupController {
    async createUser(req, res) {
        const { username, email_id, password, conform_password } = req.body;

        if (!username || !email_id || !password || !conform_password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== conform_password) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        try {
            const newUser = await UserModel.create({ username, email_id, password, conform_password });
            return res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            return res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    }
}

module.exports = SignupController;