"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const CoreCity  = sequelize.models.CoreCity;

/**
 * Gets all the cities
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAll = function(req, res) {

    CoreCity.findAll()
        .then(function(country) {
            res.status(200).json(country);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Gets a single city
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findById = function(req, res) {

    CoreCity.findById(req.params.id)
        .then(function(country) {
            res.status(200).json(country);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Gets all the cities belonging to a state
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