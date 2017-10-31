"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const CoreUser  = sequelize.models.CoreUser;

/**
 * login
 * Stores the user in the session.
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.login = function(req, res) {

    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        return res.status(400).send('Not enough parameters');
    }

    CoreUser.login(username, password)
        .then(function(user) {
            req.session.user = user;
            res.status(200).send('Granted');
        })
        .catch(function(err) {
            res.status(401).send('' + err); // Bug. Without the concatenation, it doesn't sent the msg.
        });
};

/**
 * logout
 * Removes the user user from the session
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.logout = function(req, res) {
    req.session.destroy();
    res.status(200).send('See you!');
};