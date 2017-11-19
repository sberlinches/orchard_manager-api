"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const sensorController  = require('../controllers/sensorController');

// Sensor routes
router.patch('/:sensorId(\\d+)/register', isAuthenticated, sensorController.registerSensor);
router.delete('/:sensorId(\\d+)/register', isAuthenticated, sensorController.deregisterSensor);
router.get('/user/:userId(\\d+)', isAuthenticated, sensorController.getSensorsByUser);

module.exports = router;