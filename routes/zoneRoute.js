"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const zoneController    = require('../controllers/zoneController');

// Register routes
router.get('/', isAuthenticated, zoneController.findAll);

module.exports = router;