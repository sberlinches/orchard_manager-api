"use strict";

/**
 * country
 *
 * @param sequelize
 * @param Sequelize
 * @returns {Model|*|{}|{timestamps, paranoid, freezeTableName}}
 */
module.exports = function(sequelize, Sequelize) {

    return sequelize.define('country', {
        id: {
            type: Sequelize.INTEGER(6).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: Sequelize.CHAR(2),
            field: 'code',
            allowNull: false,
            unique: true
        },
        nameEn: {
            type: Sequelize.STRING(50),
            field: 'nameEn',
            allowNull: false
        }
    },
    {
        timestamps: false
    });
};