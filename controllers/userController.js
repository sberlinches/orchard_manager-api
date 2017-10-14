"use strict";

const sequelize         = require('../models/mysql');
const User              = sequelize.import('../models/mysql/user');

/**
 * findAll
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.findAll = function(req, res) {

    var options = {
        attributes: { exclude: ['password'] },
        include: [{ all: true }]
    };

    User.findAll(options)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};