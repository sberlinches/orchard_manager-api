"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const AppPlant  = sequelize.models.AppPlant;

/**
 * findLikeName
 * Gets all plants that match the input
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findLikeName = function(req, res) {

    AppPlant.findLikeName(req.body.name)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};