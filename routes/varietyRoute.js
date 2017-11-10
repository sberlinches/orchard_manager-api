"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const varietyController = require('../controllers/varietyController');

// Variety routes
router.get('/', isAuthenticated, varietyController.getVarieties);
router.get('/plant/:plantId(\\d+)', isAuthenticated, varietyController.getVarietiesByPlant);

module.exports = router;