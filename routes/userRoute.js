"use strict";

const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const userController    = require('../controllers/userController');

// Register routes
router.get('/', isAuthenticated, userController.findAll);
router.post('/', isAuthenticated, userController.create);
router.get('/:id', isAuthenticated, userController.findById);
router.patch('/:id', isAuthenticated, userController.update);
router.delete('/:id', isAuthenticated, userController.destroy);

module.exports = router;