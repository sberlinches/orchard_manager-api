"use strict";

/**
 * CoreCity
 *
 * @param sequelize
 * @param Sequelize
 * @returns CoreCity
 */
module.exports = function(sequelize, Sequelize) {

    const CoreCity = sequelize.define('core-city', {
            id: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            stateId: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                field: 'stateId',
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
     * Gets all the cities belonging to a state
     *
     * @param stateId The state id
     * @returns Cities
     */
    CoreCity.findAllByStateId = function (stateId) {
        return CoreCity.findAll({
            where: { stateId: stateId },
            order: [['id', 'ASC']]
        });
    };

    return CoreCity;
};