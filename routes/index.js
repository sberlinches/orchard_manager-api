"use strict";

// Dependencies
const express   = require('express');
const router    = express.Router();

// Import routes
const apiRoute      = require('./apiRoute');
const authRoute     = require('./authRoute');
const cityRoute     = require('./cityRoute');
const countryRoute  = require('./countryRoute');
const plantRoute    = require('./plantRoute');
const sensorRoute   = require('./sensorRoute');
const stateRoute    = require('./stateRoute');
const userRoute     = require('./userRoute');
const varietyRoute  = require('./varietyRoute');
const zoneRoute     = require('./zoneRoute');

// Add to middleware
router.use('/', apiRoute);
router.use('/auth', authRoute);
router.use('/cities', cityRoute);
router.use('/countries', countryRoute);
router.use('/plants', plantRoute);
router.use('/sensors', sensorRoute);
router.use('/states', stateRoute);
router.use('/users', userRoute);
router.use('/varieties', varietyRoute);
router.use('/zones', zoneRoute);
// All routes above are under /api
router.use('/api', router);

module.exports = router;