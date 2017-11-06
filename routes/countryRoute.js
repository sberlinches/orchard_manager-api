"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const countryController = require('../controllers/countryController');

// Register routes
router.get('/', isAuthenticated, countryController.findAll);
router.get('/:id(\\d+)', isAuthenticated, countryController.findById);

module.exports = router;