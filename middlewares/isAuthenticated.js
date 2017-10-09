"use strict";

/**
 * isAuthenticated
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 * @param next Callback argument to the middleware function
 */
module.exports = function (req, res, next) {

    // TODO: User and permissions logic
    if (1 === 1) {
        console.log('Allowed');
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};