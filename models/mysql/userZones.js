"use strict";

/**
 * UserZones
 *
 * @param sequelize
 * @param Sequelize
 * @returns UserZones
 */
module.exports = function(sequelize, Sequelize) {

    const UserZones = sequelize.define('user_zones', {
        userId: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            primaryKey: true,
            field: 'userId',
            validate: {
                isInt: true
            }
        },
        zoneId: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            primaryKey: true,
            field: 'zoneId',
            validate: {
                isInt: true
            }
        },
        roleId: {
            type: Sequelize.INTEGER(4).UNSIGNED,
            primaryKey: true,
            field: 'roleId',
            validate: {
                isInt: true
            }
        },
        createdAt: {
            type: Sequelize.DATE,
            primaryKey: true,
            field: 'createdAt',
            validate: {
                isDate: true
            }
        }
    }, {
        timestamps: false
    });

    return UserZones;
};