"use strict";

// Dependencies
const sequelize     = require('../models/mysql');
const AppVariety    = sequelize.models.AppVariety;

/**
 * Gets all varieties
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getVarieties = function(req, res) {

    AppVariety.findVarieties()
        .then(function(variety) {
            res.status(200).json(variety);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Gets all varieties belonging to a plant
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getVarietiesByPlant = function(req, res) {

    AppVariety.findAllByPlantId(req.params.plantId)
        .then(function(variety) {
            res.status(200).json(variety);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};