"use strict";

// Dependencies
const sequelize     = require('../models/mysql');
const AppVariety    = sequelize.models.AppVariety;

/**
 * findAll
 * Gets all users
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAll = function(req, res) {

    var options = {
        include: [
            { association: 'plant', attributes: ['id', 'nameEn'] }
        ]
    };

    AppVariety.findAll(options)
        .then(function(variety) {
            res.status(200).json(variety);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * findAllByPlantId
 * Gets all varieties belonging to a plant
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAllByPlantId = function(req, res) {

    AppVariety.findAllByPlantId(req.params.id)
        .then(function(variety) {
            res.status(200).json(variety);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};