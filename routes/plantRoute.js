"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const plantController   = require('../controllers/plantController');

// Plant routes
router.get('/', isAuthenticated, plantController.getPlants);
router.post('/name', isAuthenticated, plantController.getPlantsLikeName);

module.exports = router;