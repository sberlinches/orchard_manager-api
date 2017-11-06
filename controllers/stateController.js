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
exports.findAll = function(req, res) {

    CoreState.findAll()
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
exports.findById = function(req, res) {

    CoreState.findById(req.params.id)
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
exports.findAllByCountryId = function(req, res) {

    CoreState.findAllByCountryId(req.params.id)
        .then(function(state) {
            res.status(200).json(state);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};