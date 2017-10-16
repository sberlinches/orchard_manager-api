"use strict";

// Dependencies
const express   = require('express');
const router    = express.Router();

// Import routes
const apiRoute      = require('./apiRoute');
const countryRoute  = require('./countryRoute');
const userRoute     = require('./userRoute');

// Add to middleware
router.use('/', apiRoute);
router.use('/countries', countryRoute);
router.use('/users', userRoute);
router.use('/api', router);

module.exports = router;