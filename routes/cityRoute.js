"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const cityController    = require('../controllers/cityController');

// City routes
router.get('/', isAuthenticated, cityController.getCities);
router.get('/:cityId(\\d+)', isAuthenticated, cityController.getCity);
router.get('/state/:stateId(\\d+)', isAuthenticated, cityController.getZonesByState);

module.exports = router;