"use strict";

// Dependencies
const bcrypt    = require('bcrypt');
const sequelize = require('../models/mysql');
const CoreUser  = sequelize.models.CoreUser;

/**
 * findOne
 * Gets the user that matches with the username and password given
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findByUsername = function(req, res) {

    var options = {
        where: { username: req.body.username },
        include: [
            CoreUser.associations.role,
            CoreUser.associations.country,
            CoreUser.associations.state,
            CoreUser.associations.city,
            CoreUser.associations.zones
        ]
    };

    CoreUser.findOne(options)
        .then(function(result) {

            const isValidPassword = bcrypt.compareSync(req.body.password, result.password);

            if(isValidPassword) {

                delete result.dataValues.password;

                res.status(200).json(result);
            } else {
                res.status(422).json({});
            }
        })
        .catch(function(err) {
            res.status(422).json(err);
        });
};