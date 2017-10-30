"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const CoreState = sequelize.models.CoreState;

/**
 * findAllByCountryId
 * Gets all states belonging to a country
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAllByCountryId = function(req, res) {

    CoreState.findAllByCountryId(req.params.id)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};