"use strict";

const config        = require('../../config');
const Sequelize     = require('sequelize');
const sequelize     = new Sequelize(
    config.sequelize.mysql.database,
    config.sequelize.mysql.username,
    config.sequelize.mysql.password,
    config.sequelize.mysql.options
);

sequelize.authenticate()
    .then(function() {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;