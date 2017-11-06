"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const cityController    = require('../controllers/cityController');

// Register routes
router.get('/', isAuthenticated, cityController.findAll);
router.get('/:id(\\d+)', isAuthenticated, cityController.findById);
router.get('/state/:id(\\d+)', isAuthenticated, cityController.findAllByStateId);

module.exports = router;