const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyAdmin = require('../middlewares/verifyToken');

router
.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword});
        await user.save();
        res.status(201).json({ msg : "User registered successfully"});
    }
    catch (error){
        console.log(error);
        res.status(500).json({ error : "Error, registration failed"});
    }
});

//Login

router
.post('/login', async (req,res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({error : "Authentication failed"});
        }
        const passMatch = await bcrypt.compare(password, user.password);
        if(!passMatch){
            return res.status(401).json({error : "Authentication Failed!"})
        }
        const token = jwt.sign({ userId: user._id}, 'your-secret-key', {
            expiresIn: '1h',
        });
        res.status(200).json({token});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error : "Login Failed!"});
    }
});

module.exports = router;