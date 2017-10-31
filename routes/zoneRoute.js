"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const zoneController    = require('../controllers/zoneController');

// Register routes
router.get('/', isAuthenticated, zoneController.findAll);
router.post('/', isAuthenticated, zoneController.create);
router.get('/:id', isAuthenticated, zoneController.findById);
router.patch('/:id', isAuthenticated, zoneController.update);
router.delete('/:id', isAuthenticated, zoneController.destroy);
router.get('/user/:id', isAuthenticated, zoneController.findAllByUserId);

module.exports = router;