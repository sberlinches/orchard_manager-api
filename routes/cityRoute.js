"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const cityController    = require('../controllers/cityController');

// Register routes
router.get('/state/:id', isAuthenticated, cityController.findAllByStateId);

module.exports = router;