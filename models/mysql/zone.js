"use strict";

/**
 * Zone
 *
 * @param sequelize
 * @param Sequelize
 * @returns Zone
 */
module.exports = function(sequelize, Sequelize) {

    const Zone = sequelize.define('zone', {
            id: {
                type: Sequelize.INTEGER(6).UNSIGNED,
                primaryKey: true,
                autoIncrement: true
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

    return Zone;
};