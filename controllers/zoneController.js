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

    AppZone.findZones()
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

    AppZone.findZone(req.params.zoneId)
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
 * Creates a new zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.createZone = function(req, res) {

    AppZone.createZone(req.body)
        .then(function(result) {
            res.status(200).json(result);
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

    req.body.id = req.params.zoneId;

    AppZone.updateZone(req.body)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Deletes the zone and its associated details (Performed in DB side)
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.deleteZone = function(req, res) {

    AppZone.deleteZone(req.params.zoneId)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/*
 * Collaborators
 */

/**
 * Gets all users (collaborators) of a zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getCollaborators = function(req, res) {

    AppUsersZones.getUsersByRole(req.params.zoneId, 2)// TODO: no literals
        .then(function(users) {
            res.status(200).json(users);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Adds a user (collaborator) to a zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.addCollaborator = function(req, res) {

    AppUsersZones.addUserByRole(req.body.userId, req.params.zoneId, 2)// TODO: no literals
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Removes the user (Collaborator) from the zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.removeCollaborator = function(req, res) {

    AppUsersZones.removeUserByRole(req.params.userId, req.params.zoneId, 2)// TODO: no literals
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/*
 * Followers
 */

/**
 * Gets all users (followers) of a zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getFollowers = function(req, res) {

    AppUsersZones.getUsersByRole(req.params.zoneId, 3)// TODO: no literals
        .then(function(users) {
            res.status(200).json(users);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Adds a user (follower) to a zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.addFollower = function(req, res) {

    AppUsersZones.addUserByRole(req.body.userId, req.params.zoneId, 3)// TODO: no literals
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Removes the user (follower) from the zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.removeFollower = function(req, res) {

    AppUsersZones.removeUserByRole(req.params.userId, req.params.zoneId, 3)// TODO: no literals
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/*
 * Variety
 */

/**
 * Gets all varieties of a zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.getVarieties = function(req, res) {};

/**
 * Adds a variety to a zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.addVariety = function(req, res) {

    AppZonesVarieties.addVariety(req.params.zoneId, req.body)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Modifies the variety of a zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.modifyVariety = function(req, res) {

    AppZonesVarieties.modifyVariety(req.params.zoneVarietySensorId, req.body.varietyId)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Removes the variety from the zone
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.removeVariety = function(req, res) {

    AppZonesVarieties.removeVariety(req.params.zoneVarietySensorId)
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
 * Adds a sensor to a variety
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.addSensor = function(req, res) {

    AppZonesVarieties.addSensor(req.params.zoneVarietySensorId, req.body.sensorId)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Modifies the sensor of a variety
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.modifySensor = function(req, res) {

    AppZonesVarieties.modifySensor(req.params.zoneVarietySensorId, req.body.sensorId)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

/**
 * Removes the sensor from the variety
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.removeSensor = function(req, res) {

    AppZonesVarieties.removeSensor(req.params.zoneVarietySensorId)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};