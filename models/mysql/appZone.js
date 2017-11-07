"use strict";

/**
 * AppZone
 *
 * @param sequelize
 * @param Sequelize
 * @returns AppZone
 */
module.exports = function(sequelize, Sequelize) {

    const AppZone = sequelize.define('app-zone', {
            id: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                field: 'userId',
                validate: {
                    isInt: true
                }
            },
            alias: {
                type: Sequelize.STRING(30),
                field: 'alias',
                allowNull: false,
                validate: {
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
            }
        },
        {
            timestamps: false
        });

    // Associations
    AppZone.associate = function(models) {

        // belongs-To-Many: used to connect sources with multiple targets.
        AppZone.belongsToMany(models.AppVariety, {
            as: 'varieties',
            through: models.AppZonesVarieties,
            foreignKey: {
                name: 'zoneId',
                allowNull: false
            },
            otherKey: 'varietyId',
            constraints: false
        });

        AppZone.belongsToMany(models.CoreUser, {
            as: 'users',
            through: models.AppUsersZones,
            foreignKey: {
                name: 'zoneId',
                allowNull: false
            },
            otherKey: 'userId',
            constraints: false
        });
    };

    /**
     * Finds a zone and optionally its associated details
     *
     * @param zoneId The zone id
     * @param query //TODO: Build the associations object depending on the query string
     * @returns {Promise} Zone
     */
    AppZone.findZone = function(zoneId, query) {

        var sql = "SELECT zone.id, zone.alias, variety.nameEn AS 'varieties.name', zones_varieties.id AS 'varieties.logId' ";
            sql += "FROM `app-zone` AS zone ";
            sql += "LEFT OUTER JOIN `app-zones_varieties` AS zones_varieties ON zone.id = zones_varieties.zoneId ";
            sql += "INNER JOIN `app-variety` AS variety ON zones_varieties.varietyId = variety.id ";
            sql += "WHERE zone.id = " + zoneId +";";

        return AppZone.sequelize.query(sql, {type: sequelize.QueryTypes.SELECT, nest:true})
    };

    /**
     * Finds all zones where the user is: Owner, collaborator and follower
     *
     * @param userId The user id
     * @returns {Promise} Zone
     */
    AppZone.findZonesByUser = function(userId) {

        var sql = "SELECT users_zones.zoneId AS id, users_zones.roleId, zone.alias ";
        sql += "FROM `app-users_zones` AS users_zones ";
        sql += "LEFT OUTER JOIN `app-zone` AS zone ON users_zones.zoneId = zone.id ";
        sql += "WHERE users_zones.userId = " + userId + " ";
        sql += "ORDER BY zone.alias ASC;";

        return sequelize.models.AppUsersZones.sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})

        /*return sequelize.models.AppUsersZones.findAll({
            attributes: ['zoneId', 'roleId'],
            where: { userId: userId },
            order: [[sequelize.literal('zone.alias'), 'ASC']],
            include: [
                { association: 'zone', attributes: ['alias'] }
            ],
            raw: true
        });*/
    };

    return AppZone;
};