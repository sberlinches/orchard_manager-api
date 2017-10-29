'use strict';

const env           = process.env.NODE_ENV;
const parameters    = require('./parameters.json')[env];
const isProduction  = (env === 'production');

/**
 * Application configuration parameters
 */
module.exports = {
    host: parameters.host,
    port: process.env.PORT || parameters.port,
    key: parameters.key,
    cert: parameters.cert,
    sequelize: {
        mysql: {
            database: parameters.mysql.database,
            username: parameters.mysql.username,
            password: parameters.mysql.password,
            options: {
                host: parameters.mysql.host,
                port: parameters.mysql.port,
                dialect: parameters.mysql.dialect,
                dialectOptions: parameters.mysql.dialectOptions,
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
    redis: {
        host: parameters.redis.host,
        port: parameters.redis.port
    },
    bodyParser: {
        json: {},
        urlencoded: {
            extended: true
        }
    },
    compression: true,
    session: {
        // This is the secret used to sign the session ID cookie. This can be either a string for a single secret, or
        // an array of multiple secrets. If an array of secrets is provided, only the first element will be used to sign
        // the session ID cookie, while all the elements will be considered when verifying the signature in requests.
        secret: parameters.session,

        // Forces the session to be saved back to the session store, even if the session was never modified during the
        // request. Depending on your store this may be necessary, but it can also create race conditions where a client
        // makes two parallel requests to your server and changes made to the session in one request may get overwritten
        // when the other request ends, even if it made no changes (this behavior also depends on what store you're
        // using).
        // How do I know if this is necessary for my store? The best way to know is to check with your store if it
        // implements the touch method. If it does, then you can safely set resave: false. If it does not implement the
        // touch method and your store sets an expiration date on stored sessions, then you likely need resave: true.
        resave: false,

        // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new
        // but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or
        // complying with laws that require permission before setting a cookie. Choosing false will also help with race
        // conditions where a client makes multiple parallel requests without a session.
        saveUninitialized: true,
        cookie: {
            secure: (isProduction)
        }
    },
    bcrypt: {
        salt: 10
    }
};