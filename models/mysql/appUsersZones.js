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
            field: 'userId',
            primaryKey: true,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        zoneId: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            field: 'zoneId',
            primaryKey: true,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        roleId: {
            type: Sequelize.INTEGER(4).UNSIGNED,
            field: 'roleId',
            primaryKey: true,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'createdAt',
            allowNull: true,
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
     * @returns {UsersZones}
     */
    AppUsersZones.findZonesByUser = function(userId) {

        var sql = "SELECT users_zones.zoneId AS id, users_zones.roleId, zone.alias ";
            sql += "FROM `app-users_zones` AS users_zones ";
            sql += "LEFT OUTER JOIN `app-zone` AS zone ON users_zones.zoneId = zone.id ";
            sql += "WHERE users_zones.userId = :userId ";
            sql += "ORDER BY zone.alias ASC;";

        return AppUsersZones.sequelize.query(sql, {
            replacements: { userId: userId },
            type: sequelize.QueryTypes.SELECT
        })

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

    /**
     * Gets all users by role of a zone
     *
     * @param zoneId
     * @param roleId
     * @returns {Promise}
     */
    AppUsersZones.getUsersByRole = function(zoneId, roleId) {

        var sql = "SELECT userId FROM `app-users_zones` WHERE zoneId = :zoneId AND roleId = :roleId ";

        return AppUsersZones.sequelize.query(sql, {
            model: AppUsersZones,
            replacements: {
                zoneId: zoneId,
                roleId: roleId
            },
            type: sequelize.QueryTypes.SELECT
        });
    };

    /**
     * Adds an user with certain role to a zone
     *
     * @param userId The user to associate
     * @param zoneId The zone to be associated
     * @param roleId The role the user will have
     * @returns {Promise}
     */
    AppUsersZones.addUserByRole = function(userId, zoneId, roleId) {

        var sql = "INSERT INTO `app-users_zones` (userId, zoneId, roleId) VALUES (:userId, :zoneId, :roleId);";

        return AppUsersZones.sequelize.query(sql, {
            model: AppUsersZones,
            replacements: {
                userId: userId,
                zoneId: zoneId,
                roleId: roleId
            },
            type: sequelize.QueryTypes.INSERT
        });

        /*return AppUsersZones.create({
            userId: userId,
            zoneId: zoneId,
            roleId: roleId
        });*/
    };

    /**
     * Removes an user with certain role from a zone
     *
     * @param userId
     * @param zoneId
     * @param roleId
     * @returns {Promise}
     */
    AppUsersZones.removeUserByRole = function(userId, zoneId, roleId) {

        var sql = "DELETE FROM `app-users_zones` WHERE userId = :userId AND zoneId = :zoneId AND roleId = :roleId;";

        return AppUsersZones.sequelize.query(sql, {
            model: AppUsersZones,
            replacements: {
                userId: userId,
                zoneId: zoneId,
                roleId: roleId
            },
            type: sequelize.QueryTypes.UPDATE
        });
    };

    return AppUsersZones;
};