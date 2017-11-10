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
     * Finds all the states
     *
     * @returns {Promise}
     */
    CoreState.findStates = function() {

        var sql = "SELECT id, countryId, nameEn AS name FROM `core-state`;";

        return CoreState.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        });

        //return CoreState.findAll();
    };

    /**
     * Finds a single state
     *
     * @param stateId The state id
     * @returns {Promise}
     */
    CoreState.findState = function(stateId) {

        var sql = "SELECT id, countryId, nameEn AS name FROM `core-state` WHERE id = :stateId;";

        return CoreState.sequelize.query(sql, {
            replacements: { stateId: stateId },
            type: sequelize.QueryTypes.SELECT,
            plain: true // Return a single row
        });

        //return CoreState.findById(stateId);
    };

    /**
     * Gets all the states belonging to a country
     *
     * @param countryId The country id
     * @returns {Promise}
     */
    CoreState.findStatesByCountry = function (countryId) {

        var sql = "SELECT id, countryId, nameEn AS name FROM `core-state` ";
            sql += "WHERE countryId = :countryId;";

        return CoreState.sequelize.query(sql, {
            replacements: { countryId: countryId },
            type: sequelize.QueryTypes.SELECT
        });

        /*return CoreState.findAll({
            where: { countryId: countryId }
        });*/
    };

    return CoreState;
};