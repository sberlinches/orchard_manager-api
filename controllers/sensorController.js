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
 * Gets all the sensors owned by the user given
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAllByUserId = function(req, res) {

    var options = {
        include: [
            { association: 'user', attributes: ['id', 'username'] }
        ]
    };

    AppSensor.findAllByUserId(req.params.id, options)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};