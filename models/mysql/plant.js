"use strict";

/**
 * Plant
 *
 * @param sequelize
 * @param Sequelize
 * @returns plant
 */
module.exports = function(sequelize, Sequelize) {

    const Plant = sequelize.define('plant', {
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

    // Class Method
    Plant.findLikeName = function (name) {
        return Plant.findAll({
            attributes: ['id', ['nameEn', 'name']],
            where: { nameEn: { $like: '%' + name + '%' } },
            order: [['nameEn', 'ASC']],
            limit: 5
        });
    };

    return Plant;
};