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
                allowNull: false,
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
     * Finds all zones
     *
     * @returns {Zone}
     */
    AppZone.findZones = function() {

        var sql = "SELECT id, userId, alias FROM `app-zone` AS `app-zone`;";

        return AppZone.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        });

        //return AppZone.findAll();
    };

    /**
     * Finds a zone and optionally its associated details
     *
     * @param zoneId
     * @returns {Promise}
     */
    AppZone.findZone = function(zoneId) {

        var sql = "SELECT zone.id, zone.alias, ";
            sql+= "zones_varieties.id AS 'varietiesSensors.id', variety.id AS 'varietiesSensors.variety.id', ";
            sql+= "variety.nameEn AS 'varietiesSensors.variety.name', zones_varieties.sensorId AS 'varietiesSensors.sensor.id', ";
            sql+= "users.id AS 'users.id', users.username AS 'users.username', zones_users.roleId AS 'users.roleId' ";
            sql+= "FROM `app-zone` AS zone ";
            sql+= "LEFT OUTER JOIN `app-zones_varieties` AS zones_varieties ON zone.id = zones_varieties.zoneId ";
            sql+= "LEFT OUTER JOIN `app-variety` AS variety ON zones_varieties.varietyId = variety.id ";
            sql+= "LEFT OUTER JOIN `app-users_zones` AS zones_users ON zone.id = zones_users.zoneId " ;
            sql+= "LEFT OUTER JOIN `core-user` AS users ON zones_users.userId = users.id ";
            sql+= "WHERE zone.id = :zoneId ORDER BY zones_varieties.id DESC;";

        return AppZone.sequelize.query(sql, {
            replacements: { zoneId: zoneId },
            type: sequelize.QueryTypes.SELECT,
            nest: true
        });

        /*return AppZone.findOne({
            where: { id: zoneId },
            attributes: ['id', 'alias'],
            include: [ 'varieties', 'users' ]
        });*/
    };

    /**
     * Creates a new zone
     * TODO: Use transactions, or a native way to persist it.
     * TODO: Create should be dynamic. zone + usersZones, or zone + usersZones + zonesVarieties
     *
     * @param zone
     * @returns {Promise}
     */
    AppZone.createZone = function(zone) {

        var sql = "INSERT INTO `app-zone` (id, userId, alias) VALUES (DEFAULT, :userId, :alias);";

        //return AppZone.create(zone)
        return AppZone.sequelize.query(sql, {
            model: AppZone,
            replacements: {
                userId: zone.userId,
                alias: zone.alias
            },
            type: sequelize.QueryTypes.INSERT
        })
        .then(function(zoneId) {

            zoneId = zoneId[0][0].id;
            // Once the zone has been added, it needs to be associated
            // The redundancy of the owner (user) data is just for performance issues
            return sequelize.models.AppUsersZones.addUserByRole(zone.userId, zoneId, 1); // TODO: no magic numbers
        });
    };

    /**
     * Updates a zone
     * TODO: Update in bulk: zone + usersZones + zonesVarieties
     *
     * @param zone The zone object
     * @returns {Promise}
     */
    AppZone.updateZone = function(zone) {

        var sql = "UPDATE `app-zone` SET alias = :alias WHERE id = :zoneId";

        return AppZone.sequelize.query(sql, {
            replacements: {
                zoneId: zone.id,
                alias: zone.alias
            },
            type: sequelize.QueryTypes.UPDATE
        });

        /*return AppZone.update(zone, {
            where: { id: zoneId }
        })*/
    };

    /**
     * Deletes a zone and its associated details (Performed in DB side)
     *
     * @param zoneId The zone id
     * @returns {Promise}
     */
    AppZone.deleteZone = function(zoneId) {

        var sql = "DELETE FROM `app-zone` WHERE id = :zoneId;";

        return AppZone.sequelize.query(sql, {
            replacements: { zoneId: zoneId },
            type: sequelize.QueryTypes.UPDATE
        });

        /*return AppZone.destroy({
            where: { id: zoneId }
        });*/
    };

    return AppZone;
};