"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const varietyController = require('../controllers/varietyController');

// Register routes
router.get('/', isAuthenticated, varietyController.findAll);
router.get('/plant/:id(\\d+)', isAuthenticated, varietyController.findAllByPlantId);

module.exports = router;