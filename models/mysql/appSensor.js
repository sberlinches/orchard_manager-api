"use strict";

/**
 * AppSensor
 *
 * @param sequelize
 * @param Sequelize
 * @returns AppSensor
 */
module.exports = function(sequelize, Sequelize) {

    const AppSensor = sequelize.define('app-sensor', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            field: 'userId',
            validate: {
                isInt: true
            }
        },
        serial: {
            type: Sequelize.CHAR(9),
            field: 'serial',
            allowNull: false,
            unique: true
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
        },
        deletedAt: {
            type: Sequelize.DATE,
            field: 'deletedAt',
            validate: {
                isDate: true
            }
        }
    });

    // Associations
    AppSensor.associate = function(models) {

        // belongsTo: the foreign key for the one-to-one relation exists on the source model.
        AppSensor.belongsTo(models.CoreUser, {
            as: 'user',
            foreignKey: 'userId',
            constraints: false
        });
    };

    /**
     * Finds all sensors owned by the given user
     *
     * @param userId The user id
     * @returns {Promise}
     */
    AppSensor.findAllByUserId = function (userId) {

        var sql = "SELECT id, serial FROM `app-sensor` ";
            sql += "WHERE deletedAt IS NULL AND userId = :userId;";

        return AppSensor.sequelize.query(sql, {
            model: AppSensor,
            replacements: { userId: userId },
            type: sequelize.QueryTypes.SELECT
        });

        /*return AppSensor.findAll({
            attributes: ['id', 'serial'],
            where: { userId: userId }
        });*/
    };

    /**
     * Updates the sensor ownership
     *
     * @param sensorId The sensor id
     * @param userId The new owner id
     * @returns {Promise}
     */
    AppSensor.updateSensorOwnership = function (sensorId, userId) {

        var sql = "UPDATE `app-sensor` SET userId = :userId WHERE id = :sensorId";

        return AppSensor.sequelize.query(sql, {
            model: AppSensor,
            replacements: {
                sensorId: sensorId,
                userId: userId
            },
            type: sequelize.QueryTypes.UPDATE
        });

        /*return AppSensor.update({
            userId: userId
        }, {
            fields: ['userId'],
            where: { id: sensorId }
        });*/
    };

    /**
     * Deletes the sensor ownership
     *
     * @param sensorId The sensor id
     * @returns {Promise}
     */
    AppSensor.deleteSensorOwnership = function (sensorId) {

        var sql = "UPDATE `app-sensor` SET userId = NULL WHERE id = :sensorId";

        return AppSensor.sequelize.query(sql, {
            model: AppSensor,
            replacements: { sensorId: sensorId },
            type: sequelize.QueryTypes.UPDATE
        });

        /*return AppSensor.update({
            userId: null
        }, {
            fields: ['userId'],
            where: { id: sensorId }
        });*/
    };

    return AppSensor;
};