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
                allowNull: false,
                validate: {
                    isInt: true
                }
            },
            varietyId: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                field: 'varietyId',
                allowNull: false,
                validate: {
                    isInt: true
                }
            },
            sensorId: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                field: 'sensorId',
                allowNull: true,
                validate: {
                    isInt: true
                }
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'createdAt',
                allowNull: true,
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
     * Adds a variety to a zone
     *
     * @param zoneId
     * @param zonesVarieties
     * @returns {Promise}
     */
    AppZonesVarieties.addVariety = function(zoneId, zonesVarieties) {

        var sql = "INSERT INTO `app-zones_varieties` (id, zoneId, varietyId, sensorId) ";
            sql+= "VALUES (DEFAULT,:zoneId, :varietyId, :sensorId);";

        return AppZonesVarieties.sequelize.query(sql, {
            replacements: {
                zoneId: zoneId,
                varietyId: zonesVarieties.varietyId,
                sensorId: (zonesVarieties.sensorId)? zonesVarieties.sensorId: null
            },
            type: sequelize.QueryTypes.INSERT
        });

        /*return AppZonesVarieties.create({
            zoneId: zoneId,
            varietyId: zonesVarieties.varietyId,
            sensorId: zonesVarieties.sensorId
        });*/
    };

    /**
     * Modifies the variety of a zone
     *
     * @param zoneVarietySensorId
     * @param varietyId
     */
    AppZonesVarieties.modifyVariety = function(zoneVarietySensorId, varietyId) {

        var sql = "UPDATE `app-zones_varieties` SET varietyId = :varietyId WHERE id = :id";

        return AppZonesVarieties.sequelize.query(sql, {
            replacements: {
                id: zoneVarietySensorId,
                varietyId: varietyId
            },
            type: sequelize.QueryTypes.UPDATE
        });

        /*return AppZonesVarieties.update({varietyId: varietyId}, {
            where: { id: zoneVarietySensorId }
        });*/
    };

    /**
     * Removes the variety from the zone
     * The variety is required, so without variety the entire touple disappears
     *
     * @param zoneVarietySensorId
     * @returns {Promise}
     */
    AppZonesVarieties.removeVariety = function(zoneVarietySensorId) {

        var sql = "DELETE FROM `app-zones_varieties` WHERE id = :id";

        return AppZonesVarieties.sequelize.query(sql, {
            replacements: { id: zoneVarietySensorId },
            type: sequelize.QueryTypes.UPDATE
        });

        /*return AppZonesVarieties.destroy({
            where: { id: zoneVarietySensorId }
        });*/
    };

    /**
     * Adds a sensor to a variety
     *
     * @param zoneVarietySensorId
     * @param sensorId
     * @returns {Promise}
     */
    AppZonesVarieties.addSensor = function(zoneVarietySensorId, sensorId) {

        var sql = "UPDATE `app-zones_varieties` SET sensorId = :sensorId WHERE id = :id AND sensorId IS NULL;";

        return AppZonesVarieties.sequelize.query(sql, {
            replacements: {
                id: zoneVarietySensorId,
                sensorId: sensorId
            },
            type: sequelize.QueryTypes.UPDATE
        });
    };

    /**
     * Modifies the sensor of a variety
     *
     * @param zoneVarietySensorId
     * @param sensorId
     * @returns {Promise}
     */
    AppZonesVarieties.modifySensor = function(zoneVarietySensorId, sensorId) {

        var sql = "UPDATE `app-zones_varieties` SET sensorId = :sensorId WHERE id = :id;";

        return AppZonesVarieties.sequelize.query(sql, {
            replacements: {
                id: zoneVarietySensorId,
                sensorId: sensorId
            },
            type: sequelize.QueryTypes.UPDATE
        });

        /*return AppZonesVarieties.update({sensorId: sensorId}, {
            where: { id: zoneVarietySensorId }
        });*/
    };

    /**
     * Removes the sensor from the variety
     *
     * @param zoneVarietySensorId
     * @returns {Promise}
     */
    AppZonesVarieties.removeSensor = function(zoneVarietySensorId) {

        return this.modifySensor(zoneVarietySensorId, null);
    };


    return AppZonesVarieties;
};