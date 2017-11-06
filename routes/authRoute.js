"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const authController    = require('../controllers/authController');

// Register routes
router.post('/login', authController.login); //TODO: avoid to logged users log in again
router.post('/signup', authController.signup); //TODO: avoid to logged users create new accounts
router.get('/logout', isAuthenticated, authController.logout);

module.exports = router;