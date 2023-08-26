const express = require('express');
const router = express.Router();
const {authenticate, requireRole} = require('../helpers/roleValidator');
const {getDepartments, getDepartment, updateMemberToManager, addUsersToDepartment, updateManagerToMember, deleteUserFromDepartment, updateMemberToAnotherDepartment} = require('../controller/DepartmentController');

router.get('/', authenticate, requireRole({collection: 0, task: 0}), getDepartments);
router.get('/:id', authenticate, requireRole({collection: 0, task: 0}), getDepartment);
router.put('/:id', authenticate, requireRole({collection: 0, task: 2}), updateMemberToManager);
router.post('/:id', authenticate, requireRole({collection: 0, task: 1}), addUsersToDepartment);
router.put('/:id', authenticate, requireRole({collection: 0, task: 2}), updateManagerToMember);
router.delete('/:id', authenticate, requireRole({collection: 0, task: 3}), deleteUserFromDepartment);
router.put('/:id', authenticate, requireRole({collection: 0, task: 2}), updateMemberToAnotherDepartment);

module.exports = router;
