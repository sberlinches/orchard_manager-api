"use strict";

/**
 * AppZone
 *
 * @param sequelize
 * @param Sequelize
 * @returns AppZone
 */
module.exports = function(sequelize, Sequelize) {

    const AppZone = sequelize.define('app-zone', {
            id: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                field: 'userId',
                validate: {
                    isInt: true
                }
            },
            alias: {
                type: Sequelize.STRING(30),
                field: 'alias',
                allowNull: false,
                validate: {
                    isAlpha: true,
                    notEmpty: true,
                    len: [2, 30]
                }
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'createdAt',
                validate: {
                    isDate: true
                }
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: 'updatedAt',
                validate: {
                    isDate: true
                }
            }
        },
        {
            timestamps: false
        });

    // Associations
    AppZone.associate = function(models) {

        // belongs-To-Many: used to connect sources with multiple targets.
        AppZone.belongsToMany(models.CoreUser, {
            as: 'users',
            through: models.AppUsersZones,
            foreignKey: {
                name: 'zoneId',
                allowNull: false
            },
            otherKey: 'userId',
            constraints: false
        });
    };

    return AppZone;
};