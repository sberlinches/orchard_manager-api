"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const Plant     = sequelize.import('../models/mysql/plant');

/**
 * findLikeName
 * Gets all plants that match the input
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findLikeName = function(req, res) {

    Plant.findLikeName(req.body.name)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};