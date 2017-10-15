"use strict";

/**
 * Role
 *
 * @param sequelize
 * @param Sequelize
 * @returns Role
 */
module.exports = function(sequelize, Sequelize) {

    const Role = sequelize.define('Role', {
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

    return Role;
};