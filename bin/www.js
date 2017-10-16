"use strict";

// Configuration parameters
const config    = require('../config');

// Dependencies
const app       = require('../app');
const https     = require('https');
const fs        = require('fs');

// Create the HTTPS server
const key       = fs.readFileSync(config.keyPath);
const cert      = fs.readFileSync(config.certPath);
const server    = https.createServer({ key: key, cert: cert }, app);

// GO!
server.listen(config.node.port, config.node.host, function() {
    console.info('Node server (%s environment) available at https://%s:%s', process.env.NODE_ENV, config.node.host, config.node.port);
});