// app.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const handlers = require('./Handler/handlers');
const userregister = require('./routes/registeruser');
const userlogin = require('./routes/loginuser');
const { authenticateUser } = require('./middlewares/authuser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(handlers);
require('dotenv').config();
// mongodb conn
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'conn error: '));
db.once('open', () => {
    console.log('conn successful mongodb');
});
// cors
app.use(cors({
    origin: 'http://localhost:5178',
}));
// routes
app.use('/registeruser',authenticateUser, userregister);
app.use('/loginuser', userlogin);
// LISTEN PORT
app.set('port', process.env.PORT);

const PORT = app.get('port');
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
