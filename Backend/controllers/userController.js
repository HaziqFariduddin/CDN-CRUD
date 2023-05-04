const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, email, phoneNumber } = req.body;

        const existingUser = await User.findOne({
            $or: [
                { username: username },
                { email: email },
                { phoneNumber: phoneNumber }
            ]
        });

        if (existingUser) {
            let message = '';
            if (existingUser.username === username) {
                message += 'Username already exists.\n';
            }
            if (existingUser.email === email) {
                message += 'Email already exists.\n';
            }
            if (existingUser.phoneNumber === phoneNumber) {
                message += 'Phone number already exists.\n';
            }
            return res.status(409).json({ message });
        }

        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const { username, email, phoneNumber } = req.body;

        const existingUser = await User.findOne({
            _id: { $ne: req.params.id },
            $or: [
                { username: username },
                { email: email },
                { phoneNumber: phoneNumber },
            ],
        });

        if (existingUser) {
            let message = '';
            if (existingUser.username === username) {
                message += 'Username already exists.\n';
            }
            if (existingUser.email === email) {
                message += 'Email already exists.\n';
            }
            if (existingUser.phoneNumber === phoneNumber) {
                message += 'Phone number already exists.\n';
            }
            return res.status(409).json({ message });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ message: 'Username already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};


exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany();
        res.status(200).json({ message: 'All users deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


