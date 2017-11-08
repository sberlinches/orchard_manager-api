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

    /**
     * Finds the last record on the log for the given plant
     *
     * @param plantLogId The plantLog id or the zonesVarieties id
     */
    AppPlantLog.findLastLog = function(plantLogId) {

        var sql = "SELECT current.isGerminated, current.isMature, current.createdAt, ";
            sql += "current.airTemp AS 'current.airTemp', current.soilTemp AS 'current.soilTemp', current.light AS 'current.light', current.airHum AS 'current.airHum', current.soilMoist AS 'current.soilMoist', current.ph AS 'current.ph', ";
            sql += "average.airTemp AS 'average.airTemp', average.soilTemp AS 'average.soilTemp', average.light AS 'average.light', average.airHum AS 'average.airHum', average.soilMoist AS 'average.soilMoist', average.ph AS 'average.ph', ";
            sql += "recomended.airTempMin AS 'recomendedMin.airTemp', recomended.soilTempMin AS 'recomendedMin.soilTemp', recomended.lightMin  AS 'recomendedMin.light', recomended.airHumMin AS 'recomendedMin.airHum', recomended.soilMoistMin AS 'recomendedMin.soilMoist', recomended.phMin AS 'recomendedMin.ph', ";
            sql += "recomended.airTempMax AS 'recomendedMax.airTemp', recomended.soilTempMax AS 'recomendedMax.soilTemp', recomended.lightMax AS 'recomendedMax.light', recomended.airHumMax AS 'recomendedMax.airHum', recomended.soilMoistMax AS 'recomendedMax.soilMoist', recomended.phMax AS 'recomendedMax.ph' ";
            sql += "FROM `app-plantLog` AS current ";
            sql += "INNER JOIN ( ";
            sql += "SELECT id, ROUND(AVG(airTemp),2) AS airTemp, ROUND(AVG(soilTemp),2) AS soilTemp, ROUND(AVG(light)) AS light, ROUND(AVG(airHum),2) AS airHum, ROUND(AVG(soilMoist),2) AS soilMoist, ROUND(AVG(ph),2) AS ph ";
            sql += "FROM `app-plantLog` GROUP BY id ";
            sql += ") AS average ON current.id = average.id ";
            sql += "INNER JOIN ( ";
            sql += "SELECT id, MAX(createdAt) AS lastRecord ";
            sql += "FROM `app-plantLog` GROUP BY id ";
            sql += ") AS last ON current.id = last.id AND current.createdAt = last.lastRecord ";
            sql += "INNER JOIN ( ";
            sql += "SELECT zones_varieties.id, airTempMin, airTempMax, soilTempMin, soilTempMax, lightMin, lightMax, airHumMin, airHumMax, soilMoistMin, soilMoistMax, phMin, phMax ";
            sql += "FROM `app-zones_varieties` AS zones_varieties ";
            sql += "INNER JOIN `app-variety` AS variety ON zones_varieties.varietyId = variety.id ";
            sql += ") AS recomended ON recomended.id = current.id ";
            sql += "WHERE current.id = " + plantLogId + ";";

        return sequelize.models.AppUsersZones.sequelize.query(sql, {type: sequelize.QueryTypes.SELECT, nest: true})
    };

    return AppPlantLog;
};