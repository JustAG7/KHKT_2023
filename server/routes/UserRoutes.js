const express = require('express');
const router = express.Router();
const {authenticate, requireRole} = require('../helpers/AuthValidator');
const {getUser, getUsers, findByName, deleteUser} = require('../controllers/UserController');

router.get('/', authenticate, requireRole({collection: 3, task: 1}), getUsers);
router.get('/:id', authenticate, requireRole({collection: 3, task: 1}), getUser);
router.get('/', authenticate, requireRole({collection: 3, task: 1}), findByName);
router.delete('/:id', authenticate, requireRole({collection: 3, task: 3}), deleteUser);

module.exports = router;
