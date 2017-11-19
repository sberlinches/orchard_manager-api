"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const CoreUser  = sequelize.models.CoreUser;

/**
 * Gets all users
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getUsers = function(req, res) {

    CoreUser.findUsers()
        .then(function(user) {
            res.status(200).json(user);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Gets an user
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getUser = function(req, res) {

    CoreUser.findUser(req.params.userId)
        .then(function(user) {
            res.status(200).json(user);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Creates a new user
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.createUser = function(req, res) {

    CoreUser.createUser(req.body)
        .then(function(user) {
            // Deletes the password before send the user back
            delete user.dataValues.password;
            res.status(200).json(user);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Updates partially an user
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.updateUser = function(req, res) {

    CoreUser.updateUser(req.params.userId, req.body)
        .then(function(response) {
            res.status(200).json(response);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Deletes an user
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.removeUser = function(req, res) {

    CoreUser.removeUser(req.params.userId)
        .then(function(response) {
            res.status(200).json(response);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};