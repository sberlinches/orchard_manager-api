"use strict";

// Dependencies
const sequelize     = require('../models/mysql');
const CoreCountry   = sequelize.models.CoreCountry;

/**
 * Gets all the countries
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getCountries = function(req, res) {

    CoreCountry.findCountries()
        .then(function(country) {
            res.status(200).json(country);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Gets a single country
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getCountry = function(req, res) {

    CoreCountry.findCountry(req.params.countryId)
        .then(function(country) {
            res.status(200).json(country);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};