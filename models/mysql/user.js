"use strict";

const bcrypt = require('bcrypt');

/**
 * user
 *
 * @param sequelize
 * @param Sequelize
 * @returns user
 */
module.exports = function(sequelize, Sequelize) {

    const user = sequelize.define('user', {
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
        },
        modifiedBy: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            field: 'modifiedBy',
            allowNull: false,
            validate: {
                isInt: true
            }
        }
    }, {
        scopes: {
            activeUsers: {
                where: { deletedAt: null }
            }
        },
        hooks: {
            afterValidate: function(user) {
                if(user.password) user.password = bcrypt.hashSync(user.password, config.bcrypt.salt);
            }
        }
    });

    user.belongsTo(sequelize.import('role.js'), { foreignKey: 'roleId' });
    user.belongsTo(sequelize.import('city.js'), { foreignKey: 'cityId' });
    user.belongsTo(sequelize.import('state.js'), { foreignKey: 'stateId' });
    user.belongsTo(sequelize.import('country.js'), { foreignKey: 'countryId' });

    return user;
};