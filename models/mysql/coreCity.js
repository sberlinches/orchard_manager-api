"use strict";

/**
 * CoreCity
 *
 * @param sequelize
 * @param Sequelize
 * @returns CoreCity
 */
module.exports = function(sequelize, Sequelize) {

    const CoreCity = sequelize.define('core-city', {
            id: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            nameEn: {
                type: Sequelize.STRING(50),
                field: 'nameEn',
                allowNull: false,
                validate: {
                    isAlpha: true,
                    notEmpty: true,
                    len: [2, 50]
                }
            },
            stateId: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                field: 'stateId',
                allowNull: false,
                validate: {
                    isInt: true
                }
            }
        },
        {
            timestamps: false
        });

    return CoreCity;
};