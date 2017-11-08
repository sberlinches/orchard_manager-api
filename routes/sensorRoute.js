"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const sensorController  = require('../controllers/sensorController');

// Sensor routes
router.get('/', isAuthenticated, sensorController.getSensors);
router.patch('/:sensorId(\\d+)/owner', isAuthenticated, sensorController.updateSensorOwnership);
router.delete('/:sensorId(\\d+)/owner', isAuthenticated, sensorController.deleteSensorOwnership);
router.get('/user/:userId(\\d+)', isAuthenticated, sensorController.getSensorsByUser);

module.exports = router;