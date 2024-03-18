/* loginuser.js */
const express = require('express');
const bcrypt = require('bcrypt');
const { createSession } = require('../middlewares/authuser');
const User = require('../models/user');

const userlogin = express.Router();

userlogin.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'E-poçt qeydiyyatdan keçməyib' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Yanlış e-poçt və ya parol' });
        }

        const sessionId = await createSession(user._id);

        res.cookie('sessionId', sessionId, { httpOnly: true });

        res.status(200).json({ message: 'Giriş uğurlu oldu', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Daxili Server Xətası' });
    }
});

module.exports = userlogin;
