"use strict";

// Dependencies
const sequelize     = require('../models/mysql');
const AppPlantLog   = sequelize.models.AppPlantLog;

/**
 * Gets the last record on the log for the given plant
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getLastLog = function(req, res) {

    AppPlantLog.findLastLog(req.params.plantLogId)
        .then(function(log) {
            res.status(200).json(log);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};