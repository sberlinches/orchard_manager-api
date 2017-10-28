"use strict";

/**
 * CoreRole
 *
 * @param sequelize
 * @param Sequelize
 * @returns CoreRole
 */
module.exports = function(sequelize, Sequelize) {

    const CoreRole = sequelize.define('core-role', {
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

    return CoreRole;
};