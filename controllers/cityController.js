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
exports.getCities = function(req, res) {

    CoreCity.findCities()
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
exports.getCity = function(req, res) {

    CoreCity.findCity(req.params.cityId)
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
exports.getZonesByState = function(req, res) {

    CoreCity.findZonesByState(req.params.stateId)
        .then(function(city) {
            res.status(200).json(city);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};