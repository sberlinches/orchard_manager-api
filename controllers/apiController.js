"use strict";

/**
 * handshake
 * Just a handshaking with the registered devices
 *
 * @param req HTTP request argument
 * @param res HTTP response argument
 */
exports.handshake = function(req, res) {
    res.status(200).send("Greetings!");
};