"use strict";

const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const apiController     = require('../controllers/apiController');

// Register routes
router.get('/', isAuthenticated, apiController.handshake);

module.exports = router;