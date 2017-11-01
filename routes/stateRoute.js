"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const stateController   = require('../controllers/stateController');

// Register routes
router.get('/country/:id(\\d+)', isAuthenticated, stateController.findAllByCountryId);

module.exports = router;