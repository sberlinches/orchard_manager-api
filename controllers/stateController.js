"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const CoreState = sequelize.models.CoreState;

/**
 * Gets all the states
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getStates = function(req, res) {

    CoreState.findStates()
        .then(function(country) {
            res.status(200).json(country);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Gets a single state
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getState = function(req, res) {

    CoreState.findState(req.params.stateId)
        .then(function(country) {
            res.status(200).json(country);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Gets all the states belonging to a country
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getStatesByCountry = function(req, res) {

    CoreState.findStatesByCountry(req.params.countryId)
        .then(function(state) {
            res.status(200).json(state);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};