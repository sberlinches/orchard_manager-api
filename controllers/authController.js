"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const CoreUser  = sequelize.models.CoreUser;

/**
 * Stores the user in the session
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
            // Stores the user in session
            req.session.user = user;
            res.status(200).send(user);
        })
        .catch(function(err) {
            res.status(401).send('' + err); // Bug. Without the concatenation, it doesn't sent the msg.
        });
};

/**
 * Creates an user account and stores it in the session
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.signup = function(req, res) {

    // Every account created through signup has user role
    req.body.roleId = 3; // TODO: No literals

    CoreUser.create(req.body)
        .then(function(user) {
            // Deletes the password before send the user back
            delete user.dataValues.password;
            // Stores the user in session
            req.session.user = user;
            res.status(200).json(user);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Removes the user user from the session
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.logout = function(req, res) {
    req.session.destroy();
    res.status(200).send('See you!');
};