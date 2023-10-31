const express = require('express');
const router = express.Router();
const {authenticate, requireRole} = require('../helpers/AuthValidator');
const {getUser, getUsers, findByName, deleteUser, findByUser, addUser} = require('../controllers/UserController');

router.post('/', authenticate, requireRole({collection: 3, task: 0}), addUser);
router.get('/', authenticate, requireRole({collection: 3, task: 0}), getUsers);
router.get('/:id', authenticate, requireRole({collection: 3, task: 0}), getUser);
router.get('/search', authenticate, requireRole({collection: 3, task: 1}), findByName);
router.get('/userSearch', authenticate, requireRole({collection: 3, task: 0}), findByUser);
router.delete('/:id', authenticate, requireRole({collection: 3, task: 1}), deleteUser);


module.exports = router;
