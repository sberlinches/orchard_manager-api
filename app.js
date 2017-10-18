"use strict";

// Configuration parameters
const config        = require('./config');

// Dependencies
const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const compression   = require('compression');
const router        = require('./routes');

// Set up the express app
const app           = express();

// Parse incoming requests data
app.use(bodyParser.json(config.bodyParser.json));
app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
// Enable All CORS (Cross-origin resource sharing) Requests
app.use(cors());
// Enable the routes
app.use(router);
// Compress all responses TODO: Is it working?
app.use(compression());

// Set the app parameters
app.set('host', config.host);
app.set('port', config.port);
app.set('key', config.key);
app.set('cert', config.cert);

module.exports = app;