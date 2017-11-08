"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const zoneController    = require('../controllers/zoneController');

// TODO: "integers" are not casted as integers...
// Zone routes
router.get('/', isAuthenticated, zoneController.getZones);
router.post('/', isAuthenticated, zoneController.addZone);
router.get('/:zoneId(\\d+)', isAuthenticated, zoneController.getZone);
router.patch('/:zoneId(\\d+)', isAuthenticated, zoneController.updateZone);
router.delete('/:zoneId(\\d+)', isAuthenticated, zoneController.removeZone);
router.get('/user/:userId(\\d+)', isAuthenticated, zoneController.getZonesByUser);

// Variety
router.get('/:zoneId(\\d+)/varieties', isAuthenticated, zoneController.getVarieties);
router.post('/:zoneId(\\d+)/varieties', isAuthenticated, zoneController.addVariety);
router.delete('/:zoneId(\\d+)/varieties/:varietyId(\\d+)', isAuthenticated, zoneController.removeVariety);

// Sensor
router.post('/:zoneId(\\d+)/varieties/:varietyId(\\d+)/sensors', isAuthenticated, zoneController.addSensor);
router.delete('/:zoneId(\\d+)/varieties/:varietyId(\\d+)/sensors/:sensorId(\\d+)', isAuthenticated, zoneController.removeSensor);

// Collaborator
router.get('/:zoneId(\\d+)/collaborators', isAuthenticated, zoneController.getCollaborators);
router.post('/:zoneId(\\d+)/collaborators', isAuthenticated, zoneController.addCollaborator);
router.delete('/:zoneId(\\d+)/collaborators/:userId(\\d+)', isAuthenticated, zoneController.removeCollaborator);

// Follower
router.get('/:zoneId(\d+)/followers', isAuthenticated, zoneController.getFollowers);
router.post('/:zoneId(\d+)/followers', isAuthenticated, zoneController.addFollower);
router.delete('/:zoneId(\d+)/followers/:userId(\\d+)', isAuthenticated, zoneController.removeFollower);

module.exports = router;