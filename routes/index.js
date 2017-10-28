"use strict";

// Dependencies
const express   = require('express');
const router    = express.Router();

// Import routes
const apiRoute      = require('./apiRoute');
const countryRoute  = require('./countryRoute');
const plantRoute    = require('./plantRoute');
const sensorRoute   = require('./sensorRoute');
const userRoute     = require('./userRoute');
const zoneRoute     = require('./zoneRoute');

// Add to middleware
router.use('/', apiRoute);
router.use('/countries', countryRoute);
router.use('/plants', plantRoute);
router.use('/sensors', sensorRoute);
router.use('/users', userRoute);
router.use('/zones', zoneRoute);
// All routes above are under /api
router.use('/api', router);

module.exports = router;