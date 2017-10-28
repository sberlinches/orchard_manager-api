"use strict";

/**
 * AppRole
 *
 * @param sequelize
 * @param Sequelize
 * @returns AppRole
 */
module.exports = function(sequelize, Sequelize) {

    const AppRole = sequelize.define('app-role', {
            id: {
                type: Sequelize.INTEGER(6).UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            nameEn: {
                type: Sequelize.STRING(30),
                field: 'nameEn',
                allowNull: false,
                validate: {
                    isAlpha: true,
                    notEmpty: true,
                    len: [2, 30]
                }
            }
        },
        {
            timestamps: false
        });

    return AppRole;
};