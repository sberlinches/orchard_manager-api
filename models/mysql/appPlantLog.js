"use strict";

/**
 * AppPlantLog
 *
 * @param sequelize
 * @param Sequelize
 * @returns AppPlantLog
 */
module.exports = function(sequelize, Sequelize) {

    const AppPlantLog = sequelize.define('app-plantLog', {
            id: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            airTemp: {
                type: Sequelize.DECIMAL(4, 2),
                field: 'airTemp',
                validate: {
                    isFloat: true
                }
            },
            soilTemp: {
                type: Sequelize.DECIMAL(4, 2),
                field: 'soilTemp',
                validate: {
                    isFloat: true
                }
            },
            light: {
                type: Sequelize.INTEGER(6).UNSIGNED,
                field: 'light',
                validate: {
                    isInt: true
                }
            },
            airHum: {
                type: Sequelize.DECIMAL(5, 2).UNSIGNED,
                field: 'airHum',
                validate: {
                    isFloat: true
                }
            },
            soilMoist: {
                type: Sequelize.DECIMAL(5, 2).UNSIGNED,
                field: 'soilMoist',
                validate: {
                    isFloat: true
                }
            },
            ph: {
                type: Sequelize.DECIMAL(4, 2).UNSIGNED,
                field: 'ph',
                validate: {
                    isFloat: true
                }
            },
            isGerminated: {
                type: Sequelize.BOOLEAN,
                field: 'isGerminated',
                validate: {
                    isInt: true
                }
            },
            isMature: {
                type: Sequelize.BOOLEAN,
                field: 'isGerminated',
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
    AppPlantLog.associate = function(models) {

        // belongsTo: the foreign key for the one-to-one relation exists on the source model.
        AppPlantLog.belongsTo(models.AppZonesVarieties, {
            as: 'zoneVariety',
            foreignKey: 'id',
            constraints: false
        });
    };

    // Class Method
    AppPlantLog.findAllById = function (id) {
        return AppPlantLog.findAll({
            where: { id: id }
        });
    };

    return AppPlantLog;
};