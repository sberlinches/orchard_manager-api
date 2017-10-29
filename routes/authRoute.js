"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const authController    = require('../controllers/authController');

// Register routes
router.post('/login', authController.login); //TODO: avoid to logged users log in again

module.exports = router;