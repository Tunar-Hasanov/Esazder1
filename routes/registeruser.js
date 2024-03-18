/* registeruser.js */
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const userregister = express.Router();
// post route user registration 
userregister.post('/', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'E-poçt artıq qeydiyyatdan keçib' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'Qeydiyyat uğurlu oldu', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Daxili Server Xetası' });
    }
});

module.exports = userregister;
