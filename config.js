'use strict';

const env           = process.env.NODE_ENV;
const parameters    = require('./parameters.json')[env];
const isProduction  = (env === 'production');

/**
 * Application configuration parameters
 */
module.exports = {
    isProduction: isProduction,
    node: {
        host: parameters.node.host,
        port: parameters.node.port
    },
    sequelize: {
        mysql: {
            database: parameters.mysql.database,
            username: parameters.mysql.username,
            password: parameters.mysql.password,
            options: {
                host: parameters.mysql.host,
                port: parameters.mysql.port,
                dialect: 'mysql',
                define: {
                    // Add the timestamp attributes (updatedAt, createdAt, deletedAt)
                    timestamps: true,

                    // The database is the one in charge of setting the creation and updating timestamps
                    // I don't know yet if it's a good idea
                    createdAt: false,
                    updatedAt: false,

                    // don't delete database entries but set the newly added attribute deletedAt
                    // to the current date (when deletion was done). paranoid will only work if
                    // timestamps are enabled
                    paranoid: true,

                    // disable the modification of table names; By default, sequelize will automatically
                    // transform all passed model names (first parameter of define) into plural.
                    // if you don't want that, set the following
                    freezeTableName: true
                },

                // The timezone used when converting a date from the database into a JavaScript date.
                // The timezone is also used to SET TIMEZONE when connecting to the server, to ensure that the
                // result of NOW, CURRENT_TIMESTAMP and other time related functions have in the right timezone.
                // For best cross platform performance use the format +/-HH:MM. Will also accept string versions of
                // timezones used by moment.js (e.g. 'America/Los_Angeles'); this is useful to capture daylight
                // savings time changes.
                timezone: parameters.mysql.timezone,

                // A function that gets executed every time Sequelize would log something.
                logging: (isProduction) ? false: console.log
            }
        }
    },
    bodyParser: {
        urlencoded: {
            extended: true
        }
    },
    session: {
        secret: parameters.session.timezone,
        resave: true,
        saveUninitialized: true
    },
    keyPath: parameters.keyPath,
    certPath: parameters.certPath,
    bcrypt: {
        salt: 10
    }
};