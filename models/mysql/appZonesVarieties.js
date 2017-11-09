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

    /**
     * Adds a sensor
     * // TODO: Two or more varieties in the same zone. How to distinguish them??
     *
     * @param zoneId The zone id
     * @param varietyId The variety id
     * @param sensorId The sensor id
     * @returns {Promise} ZonesVarieties
     */
    AppZonesVarieties.addSensor = function(zoneId, varietyId, sensorId) {

        var sql = "UPDATE `app-zones_varieties` SET sensorId = :sensorId ";
            sql += "WHERE zoneId = :zoneId AND varietyId = :varietyId;";

        return sequelize.models.AppUsersZones.sequelize.query(sql, {
            replacements: {
                zoneId: zoneId,
                varietyId: varietyId,
                sensorId: sensorId
            },
            type: sequelize.QueryTypes.UPDATE
        })

        /*var options = {
            where: { zoneId: zoneId, varietyId: varietyId }
        };

        return AppZonesVarieties.update({sensorId: sensorId}, options);*/
    };

    /**
     * Removes a sensor
     * // TODO: Two or more varieties in the same zone. How to distinguish them??
     *
     * @param zoneId The zone id
     * @param varietyId The variety id
     * @param sensorId The sensor id
     * @returns {Promise} ZonesVarieties
     */
    AppZonesVarieties.removeSensor = function(zoneId, varietyId, sensorId) {

        var sql = "UPDATE `app-zones_varieties` SET sensorId = NULL ";
            sql += "WHERE zoneId = :zoneId AND varietyId = :varietyId AND sensorId = :sensorId;";

        return sequelize.models.AppUsersZones.sequelize.query(sql, {
            replacements: {
                zoneId: zoneId,
                varietyId: varietyId,
                sensorId: sensorId
            },
            type: sequelize.QueryTypes.UPDATE
        })

        /*var options = {
            where: { zoneId: zoneId, varietyId: varietyId, sensorId: sensorId }
        };

        return AppZonesVarieties.update({sensorId: null}, options);*/
    };


    return AppZonesVarieties;
};