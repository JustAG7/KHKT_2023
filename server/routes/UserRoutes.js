const express = require('express');
const router = express.Router();
const {authenticate, requireRole} = require('../helpers/roleValidator');
const {getUser, getUsers, findByName, deleteUser} = require('../controllers/UserControllers');

router.get('/', authenticate, requireRole({collection: 0, task: 0}), getUsers);
router.get('/:id', authenticate, requireRole({collection: 0, task: 0}), getUser);
router.get('/', authenticate, requireRole({collection: 0, task: 0}), findByName);
router.delete('/:id', authenticate, requireRole({collection: 0, task: 3}), deleteUser);

module.exports = router;
