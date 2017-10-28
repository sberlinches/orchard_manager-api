"use strict";

// Configuration parameters
const config        = require('../../config');

// Dependencies
const Sequelize     = require('sequelize');
const sequelize     = new Sequelize(
    config.sequelize.mysql.database,
    config.sequelize.mysql.username,
    config.sequelize.mysql.password,
    config.sequelize.mysql.options
);

// Check the connection
sequelize.authenticate()
    .then(function() {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.error('Unable to connect to the database:', err);
    });

// Load the models
sequelize.models = {
    AppPlant: sequelize.import('appPlant'),
    AppRole: sequelize.import('appRole'),
    AppSensor: sequelize.import('appSensor'),
    AppUsersZones: sequelize.import('appUsersZones'),
    AppZone: sequelize.import('appZone'),
    CoreCity: sequelize.import('coreCity'),
    CoreCountry: sequelize.import('coreCountry'),
    CoreRole: sequelize.import('coreRole'),
    CoreState: sequelize.import('coreState'),
    CoreUser: sequelize.import('coreUser')
};

// Bind the associations
Object.keys(sequelize.models).forEach(function(model) {
    if (sequelize.models[model].associate) {
        sequelize.models[model].associate(sequelize.models);
    }
});

module.exports = sequelize;