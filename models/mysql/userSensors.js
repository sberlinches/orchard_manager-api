"use strict";

/**
 * UserSensors
 *
 * @param sequelize
 * @param Sequelize
 * @returns UserSensors
 */
module.exports = function(sequelize, Sequelize) {

    const UserSensors = sequelize.define('user_sensors', {
        userId: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            primaryKey: true,
            field: 'userId',
            validate: {
                isInt: true
            }
        },
        sensorId: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            primaryKey: true,
            field: 'sensorId',
            validate: {
                isInt: true
            }
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'createdAt',
            validate: {
                isDate: true
            }
        }
    }, {
        timestamps: false
    });

    return UserSensors;
};