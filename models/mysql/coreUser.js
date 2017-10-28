"use strict";

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
    CoreUser.belongsTo(sequelize.import('coreRole'), {
        foreignKey: 'roleId',
        constraints: false,
        as: 'role'
    });

    CoreUser.belongsTo(sequelize.import('coreCountry'), {
        foreignKey: 'countryId',
        constraints: false,
        as: 'country'
    });

    CoreUser.belongsTo(sequelize.import('coreState'), {
        foreignKey: 'stateId',
        constraints: false,
        as: 'state'
    });

    CoreUser.belongsTo(sequelize.import('coreCity'), {
        foreignKey: 'cityId',
        constraints: false,
        as: 'city'
    });

    CoreUser.belongsToMany(sequelize.import('appZone'), {
        as: 'zones',
        through: sequelize.import('appUsersZones'),
        foreignKey: 'userId',
        otherKey: 'zoneId'
    });

    return CoreUser;
};