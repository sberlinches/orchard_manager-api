"use strict";

// Dependencies
const express           = require('express');
const router            = express.Router();
const isAuthenticated   = require('../middlewares/isAuthenticated');
const zoneController    = require('../controllers/zoneController');

// Register routes
// TODO: "integers" are not casted as integers...
router.get('/', isAuthenticated, zoneController.findAll);
router.post('/', isAuthenticated, zoneController.create);
router.get('/:id(\\d+)', isAuthenticated, zoneController.findById);
router.patch('/:id(\\d+)', isAuthenticated, zoneController.update);
router.delete('/:id(\\d+)', isAuthenticated, zoneController.destroy);
router.post('/:id(\\d+)/variety', isAuthenticated, zoneController.addVariety);
router.post('/:id(\\d+)/collaborator', isAuthenticated, zoneController.addCollaborator);
router.post('/:id(\d+)/follower', isAuthenticated, zoneController.addFollower);
router.get('/user/:userId(\\d+)', isAuthenticated, zoneController.findAllByUserId);

module.exports = router;