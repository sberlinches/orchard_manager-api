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
     * Findas all the cities
     *
     * @returns {Promise}
     */
    CoreCity.findCities = function() {

        var sql = "SELECT id, stateId, nameEn AS name FROM `core-city`;";

        return CoreCity.sequelize.query(sql, {
            model: CoreCity,
            type: sequelize.QueryTypes.SELECT
        });

        //return CoreCity.findAll();
    };

    /**
     * Finds a single city
     *
     * @param cityId The city id
     * @returns {Promise}
     */
    CoreCity.findCity = function(cityId) {

        var sql = "SELECT id, stateId, nameEn AS name FROM `core-city` WHERE id = :cityId;";

        return CoreCity.sequelize.query(sql, {
            model: CoreCity,
            replacements: { cityId: cityId },
            type: sequelize.QueryTypes.SELECT,
            plain: true // Return a single row
        });

        //return CoreCity.findById(cityId);
    };


    /**
     * Finds all the cities belonging to a state
     *
     * @param stateId The state id
     * @returns {Promise}
     */
    CoreCity.findZonesByState = function (stateId) {

        var sql = "SELECT id, stateId, nameEn AS name FROM `core-city` ";
            sql += "WHERE stateId = :stateId;";

        return CoreCity.sequelize.query(sql, {
            model: CoreCity,
            replacements: { stateId: stateId },
            type: sequelize.QueryTypes.SELECT
        });

        /*return CoreCity.findAll({
            where: { stateId: stateId }
        });*/
    };

    return CoreCity;
};