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
     * Gets all sensors owned by the given user
     *
     * @param userId The user id
     * @returns Sensors
     */
    AppSensor.findAllByUserId = function (userId) {

        return AppSensor.findAll({
            attributes: ['id', 'serial'],
            where: { userId: userId },
            order: [['id', 'ASC']]
        }, {
            include: [
                { association: 'user', attributes: ['id', 'username'] }
            ]
        });
    };

    /**
     * Updates the sensor ownership
     *
     * @param sensorId The sensor id
     * @param userId The new owner id
     * @returns
     */
    AppSensor.updateOwner = function (sensorId, userId) {

        return AppSensor.update({
            userId: userId
        }, {
            fields: ['userId'],
            where: { id: sensorId, userId: null }
        });
    };

    /**
     * Deletes the sensor ownership
     * Only the owner of the sensor is able to delete the ownership.
     *
     * @param sensorId The sensor id
     * @param userId The previous owner id
     * @returns
     */
    AppSensor.deleteOwner = function (sensorId, userId) {

        return AppSensor.update({
            userId: null
        }, {
            fields: ['userId'],
            where: { id: sensorId, userId: userId }
        });
    };

    return AppSensor;
};