"use strict";

/**
 * Sensor
 *
 * @param sequelize
 * @param Sequelize
 * @returns Sensor
 */
module.exports = function(sequelize, Sequelize) {

    const Sensor = sequelize.define('sensor', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        serialCode: {
            type: Sequelize.CHAR(9),
            field: 'serialCode',
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
        },
        modifiedBy: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            field: 'modifiedBy',
            allowNull: false,
            validate: {
                isInt: true
            }
        }
    });

    return Sensor;
};