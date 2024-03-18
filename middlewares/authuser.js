/* middlewares/authuser.js  */
const Session = require('../models/authuser');

const authenticateUser = async (req, res, next) => {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
        return res.status(401).json({ error: 'DAXİL OL!' });
    }

    try {
        const session = await Session.findOne({ sessionId });

        if (!session || session.expiresAt < Date.now()) {
            return res.status(401).json({ message: 'Sessiyanın vaxtı bitdi və ya tapılmadı' });
        }

        req.userId = session.userId;
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Daxili Server Xətası' });
    }
};

function calculateExpirationDate() {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 60);
    return expirationDate;
}

function generateSessionId() {
    const sessionId = Math.random().toString(36).substr(2, 8);
    return sessionId;
}

const createSession = async (userId) => {
    try {
        const sessionId = generateSessionId();
        const expiresAt = calculateExpirationDate();

        const newSession = new Session({
            sessionId,
            userId,
            expiresAt
        });

        await newSession.save();
        return sessionId;
    } catch (error) {
        throw error;
    }
};

module.exports = { authenticateUser, createSession };
