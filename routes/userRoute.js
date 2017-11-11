"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const userController    = require('../controllers/userController');

// Register routes
router.get('/', isAuthenticated, userController.getUsers);
router.post('/', isAuthenticated, userController.addUser);
router.get('/:userId(\\d+)', isAuthenticated, userController.getUser);
router.patch('/:userId(\\d+)', isAuthenticated, userController.updateUser);
router.delete('/:userId(\\d+)', isAuthenticated, userController.removeUser);

module.exports = router;