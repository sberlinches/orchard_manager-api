"use strict";

// Dependencies
//const Sequelize             = require('sequelize');
const sequelize             = require('../models/mysql');
const CoreCountry           = sequelize.models.CoreCountry;
//const coreCountryRepository = require('../models/mysql/coreCountryRepository');

/**
 * Gets all the countries
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAll = function(req, res) {

    CoreCountry.findAll()
    //CoreCountry.sequelize.query(coreCountryRepository.findAll, {type: Sequelize.QueryTypes.SELECT}) // TODO: Temporal
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
exports.findById = function(req, res) {

    CoreCountry.findById(req.params.id)
        .then(function(country) {
            res.status(200).json(country);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};