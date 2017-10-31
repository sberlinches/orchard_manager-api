"use strict";

// Dependencies
//const Sequelize             = require('sequelize');
const sequelize             = require('../models/mysql');
const CoreCountry           = sequelize.models.CoreCountry;
//const coreCountryRepository = require('../models/mysql/coreCountryRepository');

/**
 * findAll
 * Gets all countries
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