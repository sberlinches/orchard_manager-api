"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const AppPlant  = sequelize.models.AppPlant;

/**
 * Gets all the plants
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getPlants = function(req, res) {

    AppPlant.findPlants()
        .then(function(plant) {
            res.status(200).json(plant);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Gets all the plants that match the input name
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getPlantsLikeName = function(req, res) {

    AppPlant.findPlantsLikeName(req.body.name)
        .then(function(plant) {
            res.status(200).json(plant);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};