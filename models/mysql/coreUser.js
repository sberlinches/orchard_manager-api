"use strict";

const config = require('../../config');
const bcrypt = require('bcrypt');

/**
 * CoreUser
 *
 * @param sequelize
 * @param Sequelize
 * @returns CoreUser
 */
module.exports = function(sequelize, Sequelize) {

    const CoreUser = sequelize.define('core-user', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING(30),
            field: 'username',
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [2, 30]
            }
        },
        email: {
            type: Sequelize.STRING(254),
            field: 'email',
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
                len: [3, 254]
            }
        },
        password: {
            type: Sequelize.STRING(60),
            field: 'password',
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [4, 30]
            }
        },
        roleId: {
            type: Sequelize.INTEGER(4).UNSIGNED,
            field: 'roleId',
            validate: {
                isInt: true
            }
        },
        firstName: {
            type: Sequelize.STRING(30),
            field: 'firstName',
            validate: {
                isAlpha: true,
                notEmpty: true,
                len: [2, 30]
            }
        },
        lastName: {
            type: Sequelize.STRING(30),
            field: 'lastName',
            validate: {
                isAlpha: true, // TODO: Accept blank spaces "lastname1 lastname2"
                notEmpty: true,
                len: [0, 30]
            }
        },
        countryId: {
            type: Sequelize.INTEGER(6).UNSIGNED,
            field: 'countryId',
            validate: {
                isInt: true
            }
        },
        stateId: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            field: 'stateId',
            validate: {
                isInt: true
            }
        },
        cityId: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            field: 'cityId',
            validate: {
                isInt: true
            }
        },
        birthAt: {
            type: Sequelize.DATEONLY,
            field: 'birthAt',
            validate: {
                isDate: true
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
        },
        deletedAt: {
            type: Sequelize.DATE,
            field: 'deletedAt',
            validate: {
                isDate: true
            }
        }
    }, {
        scopes: {
            activeUsers: {
                where: { deletedAt: null }
            }
        },
        hooks: {
            afterValidate: function(User) {
                if(User.password) User.password = bcrypt.hashSync(User.password, config.bcrypt.salt);
            }
        }
    });

    // Associations
    CoreUser.associate = function(models) {

        // belongsTo: the foreign key for the one-to-one relation exists on the source model.
        CoreUser.belongsTo(models.CoreRole, {
            as: 'role',
            foreignKey: 'roleId',
            constraints: false
        });

        CoreUser.belongsTo(models.CoreCountry, {
            as: 'country',
            foreignKey: 'countryId',
            constraints: false
        });

        CoreUser.belongsTo(models.CoreState, {
            as: 'state',
            foreignKey: 'stateId',
            constraints: false
        });

        CoreUser.belongsTo(models.CoreCity, {
            as: 'city',
            foreignKey: 'cityId',
            constraints: false
        });

        // hasMany: the foreign key for the one-to-many relation exists on the target model
        CoreUser.hasMany(models.AppSensor, {
            as: 'sensors',
            foreignKey: {
                name: 'userId',
                allowNull: true
            },
            constraints: false
        });

        CoreUser.hasMany(models.AppZone, {
            as: 'ownedZones',
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            constraints: false
        });

        // belongs-To-Many: used to connect sources with multiple targets.
        CoreUser.belongsToMany(models.AppZone, {
            as: 'zones',
            through: models.AppUsersZones,
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            otherKey: 'zoneId',
            constraints: false
        });
    };

    /**
     * Finds all users
     *
     * @returns {User}
     */
    CoreUser.findUsers = function() {

        var sql = "SELECT id, username, firstName, lastName FROM `core-user` WHERE deletedAt IS NULL";

        return CoreUser.sequelize.query(sql, {
            model: CoreUser,
            type: sequelize.QueryTypes.SELECT
        });

        /*return CoreUser.findAll({
            attributes: { exclude: ['password'] }
        });*/
    };

    /**
     * Gets an user
     *
     * @param userId The user id
     * @returns {User}
     */
    CoreUser.findUser = function(userId) {

        var sql = "SELECT id, username, firstName, lastName FROM `core-user` WHERE deletedAt IS NULL AND id = :userId";

        return CoreUser.sequelize.query(sql, {
            model: CoreUser,
            replacements: { userId: userId },
            type: sequelize.QueryTypes.SELECT,
            plain: true
        });

        /*return CoreUser.findById(userId, {
            attributes: { exclude: ['password'] }
        })*/
    };

    /**
     * Creates a new user
     *
     * @param user The user object
     * @returns {user}
     */
    CoreUser.addUser = function(user) {

        return CoreUser.create(user)
    };

    /**
     * Updates partially an user
     *
     * @param userId The user id
     * @param user The user object
     * @returns {Promise}
     */
    CoreUser.updateUser = function(userId, user) {

        return CoreUser.update(user, {
            where: { id: userId }
        })
    };

    /**
     * Deletes an user
     *
     * @param userId The user id
     * @returns {Promise}
     */
    CoreUser.removeUser = function(userId) {

        var sql = "UPDATE `core-user` SET deletedAt = :deletedAt WHERE deletedAt IS NULL AND id = :userId";

        return CoreUser.sequelize.query(sql, {
            model: CoreUser,
            replacements: {
                userId: userId,
                deletedAt: '2017-11-10 16:54:29'
            },
            type: sequelize.QueryTypes.UPDATE
        });

        /*return CoreUser.destroy({
            where: { id: userId }
        })*/
    };

    /**
     * Checks if the username and password matches with the DB
     * Then gets the user and its associated details.
     *
     * @param username User username
     * @param password User password
     * @returns {User}
     */
    CoreUser.login = function(username, password) {

        var sql = "SELECT * FROM `core-user` WHERE deletedAt IS NULL AND username = :username;";

        return CoreUser.sequelize.query(sql, {
            model: CoreUser,
            replacements: { username: username },
            type: sequelize.QueryTypes.SELECT,
            plain: true
        }).then(function(user) {

            if(!user)
                throw new Error('Bad username');

            if(!bcrypt.compareSync(password, user.dataValues.password))
                throw new Error('Bad password');

            // We don't want to send back the password...
            delete user.dataValues.password;

            return user;
        });

        /*var options = { where: { username: username } };

        return CoreUser.findOne(options)
            .then(function(user) {

                if(!user)
                    throw new Error('Bad username');

                if(!bcrypt.compareSync(password, user.password))
                    throw new Error('Bad password');

                var options = {
                    attributes: { exclude: ['password'] },
                    include: [
                        CoreUser.associations.role,
                        CoreUser.associations.country,
                        CoreUser.associations.state,
                        CoreUser.associations.city,
                        CoreUser.associations.zones
                    ]
                };

                return CoreUser.findById(user.id, options)
                    .then(function(user) {
                        return user;
                    });
            });*/
    };

    /**
     * Creates an user account and stores it in the session
     *
     * @param user The user object
     * @returns {User}
     */
    CoreUser.signup = function(user) {

        var sql = "INSERT INTO `core-user` (id, username, email, password, roleId) ";
            sql += "VALUES (DEFAULT, :username, :email, :password, :roleId);";

        return CoreUser.sequelize.query(sql, {
            model: CoreUser,
            replacements: {
                username: user.username,
                email: user.email,
                password: bcrypt.hashSync(user.password, config.bcrypt.salt),
                roleId: user.roleId
            },
            type: sequelize.QueryTypes.INSERT
        });

        //return this.addUser(user);
    };

    return CoreUser;
};