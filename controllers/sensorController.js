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

    AppSensor.findAllByUserId(req.params.userId)
        .then(function(sensor) {
            res.status(200).json(sensor);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Updates the sensor ownership
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.updateSensorOwnership = function(req, res) {

    AppSensor.updateSensorOwnership(req.params.sensorId, req.body.userId)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Deletes the sensor ownership
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.deleteSensorOwnership = function(req, res) {

    AppSensor.deleteSensorOwnership(req.params.sensorId)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};