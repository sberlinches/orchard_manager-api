"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const plantController   = require('../controllers/plantController');

// Register routes
router.get('/', isAuthenticated, plantController.findAll);
router.post('/name', isAuthenticated, plantController.findAllLikeName);

module.exports = router;