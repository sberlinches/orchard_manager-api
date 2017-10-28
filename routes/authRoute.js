"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const authController    = require('../controllers/authController');

// Register routes
router.post('/login', isAuthenticated, authController.findByUsername);

module.exports = router;