"use strict";

// Dependencies
const bcrypt    = require('bcrypt');
const sequelize = require('../models/mysql');
const CoreUser  = sequelize.models.CoreUser;

/**
 * login
 * Stores the user in the session.
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.login = function(req, res) {

    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        return res.status(400).send('Not enough parameters');
    }

    getUser(username, password)
        .then(function(user) {
            req.session.user = user;
            res.status(200).send('Granted');
        })
        .catch(function(err) {
            res.status(401).send('' + err); // Bug. Without the concatenation, it doesn't sent the msg.
        });
};

/**
 * getUser
 * Gets the user that matches in the database.
 *
 * @param username User username
 * @param password User password
 * @returns user
 */
function getUser(username, password) {

    var options = { where: { username: username } };

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

            return CoreUser.findById(user.id, options).then(function(user) {
                return user;
            });
        });
}