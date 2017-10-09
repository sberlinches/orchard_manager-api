"use strict";

const express   = require('express');
const router    = express.Router();

// Import routes
const countryRoute = require('./countryRoute');

// Add to middleware
router.use('/countries', countryRoute);
router.use('/api', router);

module.exports = router;