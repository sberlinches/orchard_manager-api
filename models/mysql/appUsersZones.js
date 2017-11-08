"use strict";

/**
 * AppUsersZones
 *
 * @param sequelize
 * @param Sequelize
 * @returns AppUsersZones
 */
module.exports = function(sequelize, Sequelize) {

    const AppUsersZones = sequelize.define('app-users_zones', {
        userId: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            primaryKey: true,
            field: 'userId',
            validate: {
                isInt: true
            }
        },
        zoneId: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            primaryKey: true,
            field: 'zoneId',
            validate: {
                isInt: true
            }
        },
        roleId: {
            type: Sequelize.INTEGER(4).UNSIGNED,
            primaryKey: true,
            field: 'roleId',
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
        }
    }, {
        timestamps: false
    });

    // Associations
    AppUsersZones.associate = function(models) {

        // belongsTo: the foreign key for the one-to-one relation exists on the source model.
        AppUsersZones.belongsTo(models.CoreUser, {
            as: 'user',
            foreignKey: 'userId',
            constraints: false
        });

        AppUsersZones.belongsTo(models.AppZone, {
            as: 'zone',
            foreignKey: 'zoneId',
            constraints: false
        });

        AppUsersZones.belongsTo(models.AppRole, {
            as: 'role',
            foreignKey: 'roleId',
            constraints: false
        });
    };

    /**
     * Finds all zones where the user is: Owner, collaborator and follower
     *
     * @param userId The user id
     * @returns {Promise} Zone
     */
    AppUsersZones.findZonesByUser = function(userId) {

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

    return AppUsersZones;
};