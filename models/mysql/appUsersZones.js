"use strict";

/**
 * AppUsersZones
 *
 * @param sequelize
 * @param Sequelize
 * @returns AppUsersZones
 */
module.exports = function(sequelize, Sequelize) {

    const AppUsersZones = sequelize.define('app-users_zones', {
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
            field: 'createdAt',
            validate: {
                isDate: true
            }
        }
    }, {
        timestamps: false
    });

    // Associations
    AppUsersZones.belongsTo(sequelize.import('appRole'), {
        foreignKey: 'roleId',
        constraints: false,
        as: 'role'
    });

    return AppUsersZones;
};