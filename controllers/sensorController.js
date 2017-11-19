"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const AppSensor = sequelize.models.AppSensor;

/**
 * Gets all sensors owned by the user given
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getSensorsByUser = function(req, res) {

    AppSensor.findAllByUserId(parseInt(req.params.userId)) // TODO: parse int as default
        .then(function(sensor) {
            res.status(200).json(sensor);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Registers the sensor to an user
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.registerSensor = function(req, res) {

    AppSensor.registerSensor(req.params.sensorId, req.body.userId)
        .then(function(response) {
            res.status(200).json(response);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * De-registers the sensor from the user
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.deregisterSensor = function(req, res) {

    AppSensor.deregisterSensor(req.params.sensorId)
        .then(function(response) {
            res.status(200).json(response);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};