"use strict";

const config        = require('./config');
const express    	= require('express');
const app        	= express();
const https         = require('https');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const compression   = require('compression');
const fs            = require('fs');
const key           = fs.readFileSync(config.keyPath);
const cert          = fs.readFileSync(config.certPath);
const server        = https.createServer({ key: key, cert: cert }, app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
app.use(cors());
if(config.isProduction) app.use(compression());

server.listen(config.node.port, config.node.host, function() {
    console.log('Server available at https://%s', config.node.host + ':' + config.node.port);
});