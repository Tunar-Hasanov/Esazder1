/* handlers.js */
const express = require('express');
const handlers = express();

// error handler
if (handlers.get('env') === 'development') {
    handlers.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// error handler
handlers.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = handlers;
