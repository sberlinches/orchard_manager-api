"use strict";

const express   = require('express');
const router    = express.Router();

// Import routes
const countryRoute  = require('./countryRoute');
const userRoute     = require('./userRoute');

// Add to middleware
router.use('/countries', countryRoute);
router.use('/users', userRoute);
router.use('/api', router);

module.exports = router;