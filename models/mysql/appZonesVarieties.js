"use strict";

/**
 * AppZonesVarieties
 *
 * @param sequelize
 * @param Sequelize
 * @returns AppZonesVarieties
 */
module.exports = function(sequelize, Sequelize) {

    const AppZonesVarieties = sequelize.define('app-zones_varieties', {
            id: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            zoneId: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                field: 'zoneId',
                validate: {
                    isInt: true
                }
            },
            varietyId: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                field: 'varietyId',
                validate: {
                    isInt: true
                }
            },
            sensorId: {
                type: Sequelize.INTEGER(11).UNSIGNED,
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
        },
        {
            timestamps: false
        });

    // Associations
    AppZonesVarieties.associate = function(models) {

        // belongsTo: the foreign key for the one-to-one relation exists on the source model.
        AppZonesVarieties.belongsTo(models.AppSensor, {
            as: 'sensor',
            foreignKey: 'sensorId',
            constraints: false
        });
    };

    return AppZonesVarieties;
};