"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const zoneController    = require('../controllers/zoneController');

// TODO: "integers" are not casted as integers...
// Zone routes
router.get('/', isAuthenticated, zoneController.getZones);
router.post('/', isAuthenticated, zoneController.createZone);
router.get('/:zoneId(\\d+)', isAuthenticated, zoneController.getZone);
router.patch('/:zoneId(\\d+)', isAuthenticated, zoneController.updateZone);
router.delete('/:zoneId(\\d+)', isAuthenticated, zoneController.deleteZone);
router.get('/user/:userId(\\d+)', isAuthenticated, zoneController.getZonesByUser);

// Collaborator routes
router.get('/:zoneId(\\d+)/collaborators', isAuthenticated, zoneController.getCollaborators);
router.post('/:zoneId(\\d+)/collaborator', isAuthenticated, zoneController.addCollaborator);
router.delete('/:zoneId(\\d+)/collaborator/:userId(\\d+)', isAuthenticated, zoneController.removeCollaborator);
// Follower routes
router.get('/:zoneId(\d+)/follower', isAuthenticated, zoneController.getFollowers);
router.post('/:zoneId(\d+)/follower', isAuthenticated, zoneController.addFollower);
router.delete('/:zoneId(\d+)/follower/:userId(\\d+)', isAuthenticated, zoneController.removeFollower);

// Variety routes
router.get('/:zoneId(\\d+)/varieties', isAuthenticated, zoneController.getVarieties);
router.post('/:zoneId(\\d+)/variety', isAuthenticated, zoneController.addVariety);
router.patch('/variety/:zoneVarietySensorId(\\d+)', isAuthenticated, zoneController.modifyVariety);
router.delete('/variety/:zoneVarietySensorId(\\d+)', isAuthenticated, zoneController.removeVariety);
// Sensor routes
router.post('/variety/sensor/:zoneVarietySensorId(\\d+)', isAuthenticated, zoneController.addSensor);
router.patch('/variety/sensor/:zoneVarietySensorId(\\d+)', isAuthenticated, zoneController.modifySensor);
router.delete('/variety/sensor/:zoneVarietySensorId(\\d+)', isAuthenticated, zoneController.removeSensor);

module.exports = router;