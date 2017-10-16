"use strict";

// Configuration parameters
const config        = require('./config');

// Dependencies
const express    	= require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const compression   = require('compression');
const router        = require('./routes');

// Set up the express app
const app        	= express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
// Enable All CORS (Cross-origin resource sharing) Requests
app.use(cors());
// Enable the routes
app.use(router);
// Compress all responses TODO: Is it working?
if(config.isProduction) app.use(compression());

module.exports = app;