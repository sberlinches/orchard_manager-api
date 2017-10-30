"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const sensorController  = require('../controllers/sensorController');

// Register routes
router.get('/', isAuthenticated, sensorController.findAll);
router.get('/user/:id', isAuthenticated, sensorController.findAllByUserId);

module.exports = router;