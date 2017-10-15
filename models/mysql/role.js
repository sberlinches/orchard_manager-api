"use strict";

/**
 * role
 *
 * @param sequelize
 * @param Sequelize
 * @returns role
 */
module.exports = function(sequelize, Sequelize) {

    const role = sequelize.define('role', {
            id: {
                type: Sequelize.INTEGER(6).UNSIGNED,
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
            nameEs: {
                type: Sequelize.STRING(50),
                field: 'nameEs',
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

    return role;
};