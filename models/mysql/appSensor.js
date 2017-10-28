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
            primaryKey: true,
            field: 'userId',
            validate: {
                isInt: true
            }
        },
        serial: {
            type: Sequelize.CHAR(9),
            field: 'serial',
            allowNull: false
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

    // Class Method
    AppSensor.findByUserId = function (userId) {
        return AppSensor.findAll({
            attributes: ['id', 'serial'],
            where: { userId: userId },
            order: [['id', 'ASC']]
        });
    };

    return AppSensor;
};