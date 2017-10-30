"use strict";

// Dependencies
const sequelize = require('../models/mysql');
const AppZone   = sequelize.models.AppZone;

/**
 * findAll
 * Gets all zones
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAll = function(req, res) {

    var options = {
        include: [
            { association: 'users', attributes: ['id', 'username'] },
            { association: 'varieties', attributes: ['id', 'nameEn'] }
        ]
    };

    AppZone.findAll(options)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * findAllByUserId
 * Gets all zones belonging to an user
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAllByUserId = function(req, res) {

    AppZone.findAllByUserId(req.params.id)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};