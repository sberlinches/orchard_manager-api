"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const sensorController  = require('../controllers/sensorController');

// Register routes
router.get('/', isAuthenticated, sensorController.findAll);
router.patch('/:id/update-owner', isAuthenticated, sensorController.updateOwner);
router.patch('/:id/delete-owner', isAuthenticated, sensorController.deleteOwner);
router.get('/user/:id', isAuthenticated, sensorController.findAllByUserId);

module.exports = router;