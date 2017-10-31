"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const AppSensor = sequelize.models.AppSensor;

/**
 * findAll
 * Gets all sensors
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAll = function(req, res) {

    var options = {
        include: [
            { association: 'user', attributes: ['id', 'username'] }
        ]
    };

    AppSensor.findAll(options)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * findAllByUserId
 * Gets all sensors owned by the user given
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAllByUserId = function(req, res) {

    AppSensor.findAllByUserId(req.params.id)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * updateOwner
 * Updates the sensor ownership
 *
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.updateOwner = function(req, res) {

    AppSensor.updateOwner(req.params.id, req.body.userId)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * deleteOwner
 * Deletes the sensor ownership
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.deleteOwner = function(req, res) {

    AppSensor.deleteOwner(req.params.id, req.body.userId)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};