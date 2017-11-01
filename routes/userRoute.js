"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const userController    = require('../controllers/userController');

// Register routes
router.get('/', isAuthenticated, userController.findAll);
router.post('/', isAuthenticated, userController.create);
router.get('/:id(\\d+)', isAuthenticated, userController.findById);
router.patch('/:id(\\d+)', isAuthenticated, userController.update);
router.delete('/:id(\\d+)', isAuthenticated, userController.destroy);

module.exports = router;