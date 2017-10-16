"use strict";

/**
 * Role
 *
 * @param sequelize
 * @param Sequelize
 * @returns Role
 */
module.exports = function(sequelize, Sequelize) {

    const Role = sequelize.define('role', {
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
            },
            nameEs: {
                type: Sequelize.STRING(30),
                field: 'nameEs',
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

    return Role;
};