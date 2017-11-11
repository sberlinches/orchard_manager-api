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
const plantLogRoute = require('./plantLogRoute');
const sensorRoute   = require('./sensorRoute');
const stateRoute    = require('./stateRoute');
const userRoute     = require('./userRoute');
const varietyRoute  = require('./varietyRoute');
const zoneRoute     = require('./zoneRoute');

// Add to middleware
router.use('/', apiRoute);
router.use('/auth', authRoute);
router.use('/cit(y)?(ies)?', cityRoute);
router.use('/countr(y)?(ies)?', countryRoute);
router.use('/plant(s)?', plantRoute);
router.use('/plant_log(s)?', plantLogRoute);
router.use('/sensor(s)?', sensorRoute);
router.use('/state(s)?', stateRoute);
router.use('/user(s)?', userRoute);
router.use('/variet(y)?(ies)?', varietyRoute);
router.use('/zone(s)?', zoneRoute);
// All routes above are under /api
router.use('/api', router);

module.exports = router;