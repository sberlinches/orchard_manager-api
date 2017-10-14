"use strict";

const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const userController    = require('../controllers/userController');

// Register routes
router.get('/', isAuthenticated, userController.findAll);

module.exports = router;