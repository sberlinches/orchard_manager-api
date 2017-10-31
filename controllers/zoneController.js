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

/**
 * create
 * Creates a new zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.create = function(req, res) {

    req.body.userId = req.session.user.id;

    AppZone.create(req.body)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * findById
 * Gets a zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findById = function(req, res) {

    AppZone.findById(req.params.id)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * update
 * Updates a zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.update = function(req, res) {

    var options = {
        where: { id: req.params.id }
    };

    AppZone.update(req.body, options)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * delete
 * Deletes a zone.
 * Only the owner of the zone is able to delete it.
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.destroy = function(req, res) {

    var options = {
        where: { id: req.params.id, userId: req.session.user.id }
    };

    AppZone.destroy(options)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};