"use strict";

// Dependencies
const express               = require('express');
const router                = express.Router();
const isAuthenticated       = require('../middlewares/isAuthenticated');
const plantLogController    = require('../controllers/plantLogController');

// Register routes
router.get('/:id', isAuthenticated, plantLogController.findAllById);

module.exports = router;