"use strict";

/**
 * CoreState
 *
 * @param sequelize
 * @param Sequelize
 * @returns CoreState
 */
module.exports = function(sequelize, Sequelize) {

    const CoreState = sequelize.define('core-state', {
            id: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            countryId: {
                type: Sequelize.INTEGER(6).UNSIGNED,
                field: 'countryId',
                allowNull: false,
                validate: {
                    isInt: true
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

    /**
     * Gets all the states belonging to a country
     *
     * @param countryId The country id
     * @returns States
     */
    CoreState.findAllByCountryId = function (countryId) {
        return CoreState.findAll({
            where: { countryId: countryId },
            order: [['id', 'ASC']]
        });
    };

    return CoreState;
};