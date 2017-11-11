"use strict";

/**
 * CoreCountry
 *
 * @param sequelize
 * @param Sequelize
 * @returns CoreCountry
 */
module.exports = function(sequelize, Sequelize) {

    const CoreCountry = sequelize.define('core-country', {
        id: {
            type: Sequelize.INTEGER(6).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: Sequelize.CHAR(2),
            field: 'code',
            allowNull: false,
            unique: true,
            validate: {
                isAlpha: true,
                notEmpty: true,
                len: [2]
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
     * Finds all the countries
     *
     * @returns {Promise}
     */
    CoreCountry.findCountries = function() {

        var sql = "SELECT id, nameEn AS name FROM `core-country`;";

        return CoreCountry.sequelize.query(sql, {
            model: CoreCountry,
            type: sequelize.QueryTypes.SELECT
        });

        //return CoreCountry.findAll();
    };

    /**
     * Finds a single state
     *
     * @param countryId The country id
     * @returns {Promise}
     */
    CoreCountry.findCountry = function(countryId) {

        var sql = "SELECT id, nameEn AS name FROM `core-country` WHERE id = :countryId;";

        return CoreCountry.sequelize.query(sql, {
            model: CoreCountry,
            replacements: { countryId: countryId },
            type: sequelize.QueryTypes.SELECT,
            plain: true // Return a single row
        });

        //return CoreCountry.findById(countryId);
    };

    return CoreCountry;
};