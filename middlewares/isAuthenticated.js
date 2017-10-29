"use strict";

/**
 * isAuthenticated
 * Checks whether the user is authenticated or not.
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 * @param next Callback argument to the middleware function
 */
module.exports = function (req, res, next) {

    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};