"use strict";

// Dependencies
const express               = require('express');
const router                = express.Router();
const isAuthenticated       = require('../middlewares/isAuthenticated');
const plantLogController    = require('../controllers/plantLogController');

// Register routes
router.get('/:plantLogId(\\d+)', isAuthenticated, plantLogController.getLastLog);

module.exports = router;