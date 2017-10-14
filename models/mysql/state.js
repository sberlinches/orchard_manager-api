"use strict";

/**
 * state
 *
 * @param sequelize
 * @param Sequelize
 * @returns state
 */
module.exports = function(sequelize, Sequelize) {

    const state = sequelize.define('state', {
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
            countryId: {
                type: Sequelize.INTEGER(6).UNSIGNED,
                field: 'countryId',
                allowNull: false,
                validate: {
                    isInt: true
                }
            }
        },
        {
            timestamps: false
        });

    return state;
};