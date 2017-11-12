"use strict";

/**
 * AppPlant
 *
 * @param sequelize
 * @param Sequelize
 * @returns AppPlant
 */
module.exports = function(sequelize, Sequelize) {

    const AppPlant = sequelize.define('app-plant', {
            id: {
                type: Sequelize.INTEGER(11).UNSIGNED,
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
            createdAt: {
                type: Sequelize.DATE,
                field: 'createdAt',
                allowNull: true,
                validate: {
                    isDate: true
                }
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: 'updatedAt',
                allowNull: true,
                validate: {
                    isDate: true
                }
            }
        },
        {
            timestamps: false
        });

    // Associations
    AppPlant.associate = function(models) {

        // hasMany: the foreign key for the one-to-many relation exists on the target model
        AppPlant.hasMany(models.AppVariety, {
            as: 'varieties',
            foreignKey: {
                name: 'plantId',
                allowNull: true
            },
            constraints: false
        });
    };

    /**
     * Finds all the plants
     *
     * @returns {Promise}
     */
    AppPlant.findPlants = function() {

        var sql = "SELECT id, nameEn AS name FROM `app-plant`;";

        return AppPlant.sequelize.query(sql, {
            model: AppPlant,
            type: sequelize.QueryTypes.SELECT
        });

        //return AppPlant.findAll();
    };

    /**
     * Finds all the plants that match the input name
     *
     * @param name The plant name
     * @returns {Promise}
     */
    AppPlant.findPlantsLikeName = function(name) {

        var sql = "SELECT id, nameEn AS name FROM `app-plant` WHERE nameEn LIKE '%" + name + "%' ORDER BY name ASC LIMIT 5;";

        return AppPlant.sequelize.query(sql, {
            model: AppPlant,
            type: sequelize.QueryTypes.SELECT
        });

        /*return AppPlant.findAll({
            attributes: ['id', ['nameEn', 'name']],
            where: { nameEn: { $like: '%' + name + '%' } },
            order: [['nameEn', 'ASC']],
            limit: 5
        });*/
    };

    return AppPlant;
};