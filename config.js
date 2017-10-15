'use strict';

module.exports = {
    isProduction: process.env.NODE_ENV === 'production',
    node: {
        host: '127.0.0.1',
        port: 3443
    },
    sequelize: {
        mysql: {
            database: '',
            username: '',
            password: '',
            parameters: {
                host: '127.0.0.1',
                dialect: 'mysql',
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                },
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
                timezone: 'America/Vancouver'
            }
        }
    },
    bodyParser: {
        urlencoded: {
            extended: true
        }
    },
    session: {
        secret: '',
        resave: true,
        saveUninitialized: true
    },
    keyPath: '../../../ssl/key.pem',
    certPath: '../../../ssl/cert.pem',
    bcrypt: {
        salt: 10
    }
};