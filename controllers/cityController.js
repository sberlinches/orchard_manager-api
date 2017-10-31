"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const CoreCity  = sequelize.models.CoreCity;

/**
 * findAllByStateId
 * Gets all cities belonging to a state
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAllByStateId = function(req, res) {

    CoreCity.findAllByStateId(req.params.id)
        .then(function(city) {
            res.status(200).json(city);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};