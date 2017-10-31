"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const AppPlant  = sequelize.models.AppPlant;

/**
 * findAll
 * Gets all plants
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAll = function(req, res) {

    AppPlant.findAll()
        .then(function(plant) {
            res.status(200).json(plant);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * findLikeName
 * Gets all plants that match the input
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAllLikeName = function(req, res) {

    AppPlant.findAllLikeName(req.body.name)
        .then(function(plant) {
            res.status(200).json(plant);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};