"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const sensorController  = require('../controllers/sensorController');

// Register routes
router.get('/', isAuthenticated, sensorController.findAll);
router.patch('/:id(\\d+)/owner', isAuthenticated, sensorController.updateOwner);
router.delete('/:id(\\d+)/owner', isAuthenticated, sensorController.deleteOwner);
router.get('/user/:userId(\\d+)', isAuthenticated, sensorController.findAllByUserId);

module.exports = router;