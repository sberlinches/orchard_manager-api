"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const AppSensor = sequelize.models.AppSensor;

/**
 * findByUserId
 * Gets all the sensors owned by the user given
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findByUser = function(req, res) {

    AppSensor.findByUserId(req.body.user)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};