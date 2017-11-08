"use strict";

// Dependencies
const sequelize         = require('../models/mysql');
const AppZone           = sequelize.models.AppZone;
const AppZonesVarieties = sequelize.models.AppZonesVarieties;
const AppUsersZones     = sequelize.models.AppUsersZones;

/**
 * Gets all zones
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getZones = function(req, res) {

    var options = {
        include: [
            { association: 'users', attributes: ['id', 'username'] },
            { association: 'varieties', attributes: ['id', 'nameEn'] }
        ]
    };

    AppZone.findAll(options)
        .then(function(zone) {
            res.status(200).json(zone);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Gets a zone and optionally its associated details
 *
 * @param req HTTP request argument
 * @param req.assoc[] An array with the associations to perform
 * @param res HTTP response argument
 */
exports.getZone = function(req, res) {

    AppZone.findZone(req.params.zoneId, req.query)
        .then(function(zone) {
            res.status(200).json(zone.groupBy(['id', 'alias']));
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Gets all zones where the user is: Owner, collaborator and follower
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getZonesByUser = function(req, res) {

    AppUsersZones.findZonesByUser(req.params.userId)
        .then(function(zone) {
            res.status(200).json(zone);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Add a new zone to the user
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.addZone = function(req, res) {

    req.body.userId = req.session.user.id;

    /*
     * TODO: Use transactions, or a native way to persist it.
     * TODO: Create should be dynamic. zone + usersZones, or zone + usersZones + zonesVarieties
     */
    AppZone.create(req.body)
        .then(function(zone) {
            return AppUsersZones.create({
                userId: req.session.user.id,
                zoneId: zone.id,
                roleId: 1 // TODO: no magic numbers. Constants?
            });
        })
        .then(function(AppZonesVarieties) {
            res.status(200).json(AppZonesVarieties);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Updates a zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.updateZone = function(req, res) {

    var options = {
        where: { id: req.params.zoneId }
    };

    /*
     * update alias name
     * update the varieties
     * update the collaborators
     * update the combination of the previous tables
     */
    AppZone.update(req.body, options)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Removes a zone and its associated details (Performed in DB side).
 * Only the owner of the zone is able to delete it.
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.removeZone = function(req, res) {

    var options = {
        where: { id: req.params.zoneId, userId: req.session.user.id }
    };

    AppZone.destroy(options)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/*
 * Sensor
 */

/**
 * Adds a sensor to a certain zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.addSensor = function(req, res) {

    AppZonesVarieties.addSensor(req.params.zoneId, req.params.varietyId, req.body.sensorId)
        .then(function(result) {
            res.status(500).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Remove a sensor from a certain zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.removeSensor = function(req, res) {

    AppZonesVarieties.removeSensor(req.params.zoneId, req.params.varietyId, req.params.sensorId)
        .then(function(result) {
            res.status(500).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/*
 * Variety
 */

/**
 * Gets all varieties of a certain zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getVarieties = function(req, res) {};

/**
 * Adds a variety to a certain zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.addVariety = function(req, res) {

    req.body.zoneId = req.params.zoneId;

    AppZonesVarieties.create(req.body)
        .then(function(result) {
            res.status(500).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Remove a variety from a certain zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.removeVariety = function(req, res) {};

/*
 * Collaborators
 */

/**
 * Gets all collaborators of a certain zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getCollaborators = function(req, res) {};

/**
 * Adds a collaborator to a certain zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.addCollaborator = function(req, res) {

    req.body.zoneId = req.params.zoneId;
    req.body.roleId = 2; // TODO: no literals

    AppUsersZones.create(req.body)
        .then(function(result) {
            res.status(500).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Remove a collaborator of a certain zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.removeCollaborator = function(req, res) {};

/*
 * Followers
 */

/**
 * Gets all followers of a certain zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getFollowers = function(req, res) {};

/**
 * Adds a follower to a certain zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.addFollower = function(req, res) {

    req.body.zoneId = req.params.zoneId;
    req.body.roleId = 3; // TODO: no literals

    AppUsersZones.create(req.body)
        .then(function(result) {
            res.status(500).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Remove a follower of a certain zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.removeFollower = function(req, res) {};