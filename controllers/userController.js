"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const CoreUser  = sequelize.import('../models/mysql/coreUser');

/**
 * findAll
 * Gets all users
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAll = function(req, res) {

    var options = {
        attributes: { exclude: ['password'] },
        include: [{ all: true }]
    };

    CoreUser.findAll(options)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * findBy
 * Gets an user
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findById = function(req, res) {

    var options = {
        attributes: { exclude: ['password'] },
        include: [{ all: true }]
    };

    CoreUser.findById(req.params.id, options)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * create
 * Inserts a new user
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.create = function(req, res) {

    CoreUser.create(req.body)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * update
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
 * destroy
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