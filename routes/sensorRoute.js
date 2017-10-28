"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const sensorController  = require('../controllers/sensorController');

// Register routes
router.post('/user', isAuthenticated, sensorController.findByUser);

module.exports = router;