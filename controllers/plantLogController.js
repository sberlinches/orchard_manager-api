"use strict";

// Dependencies
const sequelize     = require('../models/mysql');
const AppPlantLog   = sequelize.models.AppPlantLog;

/**
 * findAllById
 * Gets all the logs by id
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAllById = function(req, res) {

    AppPlantLog.findAllById(req.params.id)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};