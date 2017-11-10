"use strict";

/**
 * AppVariety
 *
 * @param sequelize
 * @param Sequelize
 * @returns AppVariety
 */
module.exports = function(sequelize, Sequelize) {

    const AppVariety = sequelize.define('app-variety', {
            id: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            plantId: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                field: 'plantId',
                allowNull: false,
                validate: {
                    isInt: true
                }
            },
            nameEn: {
                type: Sequelize.STRING(30),
                field: 'nameEn',
                allowNull: false,
                unique: true,
                validate: {
                    isAlpha: true,
                    notEmpty: true,
                    len: [2, 30]
                }
            },
            airTempMin: {
                type: Sequelize.DECIMAL(4, 2),
                field: 'airTempMin',
                validate: {
                    isFloat: true
                }
            },
            airTempMax: {
                type: Sequelize.DECIMAL(4, 2),
                field: 'airTempMax',
                validate: {
                    isFloat: true
                }
            },
            soilTempMin: {
                type: Sequelize.DECIMAL(4, 2),
                field: 'soilTempMin',
                validate: {
                    isFloat: true
                }
            },
            soilTempMax: {
                type: Sequelize.DECIMAL(4, 2),
                field: 'airTempMin',
                validate: {
                    isFloat: true
                }
            },
            lightMin: {
                type: Sequelize.INTEGER(6).UNSIGNED,
                field: 'lightMin',
                validate: {
                    isInt: true
                }
            },
            lightMax: {
                type: Sequelize.INTEGER(6).UNSIGNED,
                field: 'lightMax',
                validate: {
                    isInt: true
                }
            },
            airHumMin: {
                type: Sequelize.DECIMAL(5, 2).UNSIGNED,
                field: 'airHumMin',
                validate: {
                    isFloat: true
                }
            },
            airHumMax: {
                type: Sequelize.DECIMAL(5, 2).UNSIGNED,
                field: 'airHumMax',
                validate: {
                    isFloat: true
                }
            },
            soilMoistMin: {
                type: Sequelize.DECIMAL(5, 2).UNSIGNED,
                field: 'soilMoistMin',
                validate: {
                    isFloat: true
                }
            },
            soilMoistMax: {
                type: Sequelize.DECIMAL(5, 2).UNSIGNED,
                field: 'soilMoistMax',
                validate: {
                    isFloat: true
                }
            },
            phMin: {
                type: Sequelize.DECIMAL(4, 2).UNSIGNED,
                field: 'phMin',
                validate: {
                    isFloat: true
                }
            },
            phMax: {
                type: Sequelize.DECIMAL(4, 2).UNSIGNED,
                field: 'phMax',
                validate: {
                    isFloat: true
                }
            },
            germinationMin: {
                type: Sequelize.INTEGER(4).UNSIGNED,
                field: 'germinationMin',
                validate: {
                    isInt: true
                }
            },
            germinationMax: {
                type: Sequelize.INTEGER(4).UNSIGNED,
                field: 'germinationMax',
                validate: {
                    isInt: true
                }
            },
            maturityMin: {
                type: Sequelize.INTEGER(4).UNSIGNED,
                field: 'maturityMin',
                validate: {
                    isInt: true
                }
            },
            maturityMax: {
                type: Sequelize.INTEGER(4).UNSIGNED,
                field: 'maturityMax',
                validate: {
                    isInt: true
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
            }
        },
        {
            timestamps: false
        });

    // Associations
    AppVariety.associate = function(models) {

        // belongsTo: the foreign key for the one-to-one relation exists on the source model.
        AppVariety.belongsTo(models.AppPlant, {
            as: 'plant',
            foreignKey: 'plantId',
            constraints: false
        });
    };

    /**
     * Finds all varieties
     *
     * @returns {Promise}
     */
    AppVariety.findVarieties = function() {

        var sql ="SELECT *, nameEn AS name FROM `app-variety`";

        return AppVariety.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        });

        /*return AppVariety.findAll()*/
    };

    /**
     * Finds all varieties belonging to a plant
     *
     * @param plantId The plant id
     * @returns {Promise}
     */
    AppVariety.findAllByPlantId = function(plantId) {

        var sql ="SELECT *, nameEn AS name FROM `app-variety` WHERE plantId = :plantId";

        return AppVariety.sequelize.query(sql, {
            replacements: { plantId: plantId },
            type: sequelize.QueryTypes.SELECT
        });

        /*return AppVariety.findAll({
            where: { plantId: plantId }
        });*/
    };

    return AppVariety;
};