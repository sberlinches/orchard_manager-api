"use strict";

/**
 * country
 *
 * @param sequelize
 * @param Sequelize
 * @returns country
 */
module.exports = function(sequelize, Sequelize) {

    const country = sequelize.define('country', {
        id: {
            type: Sequelize.INTEGER(6).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: Sequelize.CHAR(2),
            field: 'code',
            allowNull: false,
            unique: true,
            validate: {
                isAlpha: true,
                notEmpty: true,
                len: [2]
            }
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
        }
    },
    {
        timestamps: false
    });

    return country;
};