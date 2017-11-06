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
exports.findAll = function(req, res) {

    var options = {
        attributes: { exclude: ['password'] }
    };

    CoreUser.findAll(options)
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
exports.findById = function(req, res) {

    var options = {
        attributes: { exclude: ['password'] }
    };

    CoreUser.findById(req.params.id, options)
        .then(function(user) {
            res.status(200).json(user);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Inserts a new user
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.create = function(req, res) {

    CoreUser.create(req.body)
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
exports.update = function(req, res) {

    var options = {
        where: { id: req.params.id }
    };

    CoreUser.update(req.body, options)
        .then(function(result) {
            res.status(200).json(result);
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
exports.destroy = function(req, res) {

    var options = {
        where: { id: req.params.id }
    };

    CoreUser.destroy(options)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};