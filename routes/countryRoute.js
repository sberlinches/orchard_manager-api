"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const countryController = require('../controllers/countryController');

// Country routes
router.get('/', isAuthenticated, countryController.getCountries);
router.get('/:countryId(\\d+)', isAuthenticated, countryController.getCountry);

module.exports = router;