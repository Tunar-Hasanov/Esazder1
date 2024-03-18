/* authadmin.js */
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionId: String,
    adminId: String,
    createdAt: { type: Date, default: Date.now },
    expiresAt: Date
});

const SessionAdmin = mongoose.model('Session', sessionSchema);

module.exports = SessionAdmin;
