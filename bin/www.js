"use strict";

// Dependencies
const app   = require('../app');
const http  = require('http');

// Create the HTTP server
const server = http.createServer(app);

// GO!
server.listen(app.get('port'), app.get('host'), function() {
    console.info('Server (%s mode) listening on port: %s ', app.get('env'), server.address().port);
});




