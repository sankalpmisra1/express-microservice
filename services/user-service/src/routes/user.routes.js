const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
router.post('/users', controller.createUser);
router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getUserById);
module.exports = router;