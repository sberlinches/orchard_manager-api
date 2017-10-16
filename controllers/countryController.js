"use strict";

// Dependencies
const Sequelize         = require('sequelize');
const sequelize         = require('../models/mysql');
const Country           = sequelize.import('../models/mysql/country');
const countryRepository = require('../models/mysql/countryRepository');

/**
 * findAll
 * Gets all countries
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAll = function(req, res) {

    //Country.findAll()
    Country.sequelize.query(countryRepository.findAll, {type: Sequelize.QueryTypes.SELECT}) // TODO: Temporal
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};