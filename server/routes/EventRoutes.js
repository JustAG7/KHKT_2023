const express = require('express');
const router = express.Router();
const {authenticate, requireRole} = require('../helpers/AuthValidator');
const {getEvents, getEvent, addEvent, addMembersToEvent, deleteMemberFromEvent, addActivityToFeed, findEventByName, updateEvent, deleteEvent, updateStatus } = require('../controllers/EventController');

router.get('/', authenticate, requireRole({collection: 0, task: 0}), getEvents);
router.get('/:id', authenticate, requireRole({collection: 0, task: 0}), getEvent);
router.post('/', authenticate, requireRole({collection: 0, task: 1}), addEvent);
router.put('/:id', authenticate, requireRole({collection: 0, task: 2}), addMembersToEvent);
router.delete('/:id', authenticate, requireRole({collection: 0, task: 3}), deleteMemberFromEvent);
router.put('/:id', authenticate, requireRole({collection: 0, task: 2}), addActivityToFeed);
router.get('/', authenticate, requireRole({collection: 0, task: 0}), findEventByName);
router.put('/:id', authenticate, requireRole({collection: 0, task: 2}), updateEvent);
router.delete('/:id', authenticate, requireRole({collection: 0, task: 3}), deleteEvent);
router.put('/:id', authenticate, requireRole({collection: 0, task: 2}), updateStatus);

module.exports = router;
