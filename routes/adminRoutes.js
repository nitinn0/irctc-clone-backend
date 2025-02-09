const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Admin Login route without verifyAdmin
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found!' });
        }
        if (!user.isAdmin) {
            return res.status(403).json({ msg: 'Access Denied. Admins only!' });
        }

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, 'your-secret-key', {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);  // Log any errors to see the issue in the console
        res.status(500).json({ msg: 'Server Error!' });
    }
});


// Registering Admin

router.post('/create-admin', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new User({
            username,
            email,
            password: hashedPassword,
            isAdmin: true,
        });

        await admin.save();
        res.status(201).json({ msg: 'Admin user created successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error creating admin user', error });
    }
});

module.exports = router;