"use strict";

//require('./functions');

const config        = require('./config');
const express    	= require('express');
const app        	= express();
const https         = require('https');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const compression   = require('compression');
//const session       = require('express-session');
const fs            = require('fs');
const key           = fs.readFileSync(config.keyPath);
const cert          = fs.readFileSync(config.certPath);
const server        = https.createServer({ key: key, cert: cert }, app);
const router        = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
//app.use(session(config.session));
app.use(cors());
app.use(router);
if(config.isProduction) app.use(compression()); // TODO: Is it working?

server.listen(config.node.port, config.node.host, function() {
    console.log('Server available at https://%s', config.node.host + ':' + config.node.port);
});