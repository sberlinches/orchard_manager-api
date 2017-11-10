"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const stateController   = require('../controllers/stateController');

// State routes
router.get('/', isAuthenticated, stateController.getStates);
router.get('/:stateId(\\d+)', isAuthenticated, stateController.getState);
router.get('/country/:countryId(\\d+)', isAuthenticated, stateController.getStatesByCountry);

module.exports = router;