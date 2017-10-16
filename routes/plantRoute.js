"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const plantController   = require('../controllers/plantController');

// Register routes
router.post('/', isAuthenticated, plantController.findLikeName);

module.exports = router;