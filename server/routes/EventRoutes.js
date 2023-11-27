const express = require("express");
const router = express.Router();
const { authenticate, requireRole } = require("../helpers/AuthValidator");
const {
  getEvents,
  getEvent,
  addEvent,
  addMembersToEvent,
  deleteMemberFromEvent,
  addActivityToFeed,
  findEventByName,
  updateEvent,
  deleteEvent,
  updateStatus,
  checkPassword,
} = require("../controllers/EventController");

router.get(
  "/",
  authenticate,
  requireRole({ collection: 1, task: 0 }),
  getEvents
);
router.get(
  "/:id",
  authenticate,
  requireRole({ collection: 1, task: 0 }),
  getEvent
);
router.post(
  "/",
  authenticate,
  requireRole({ collection: 1, task: 1 }),
  addEvent
);
router.delete(
  "/:id/leave",
  authenticate,
  requireRole({ collection: 1, task: 0 }),
  deleteMemberFromEvent
);
router.put(
  "/:id",
  authenticate,
  requireRole({ collection: 1, task: 0 }),
  addMembersToEvent
);
router.put(
  "/:id",
  authenticate,
  requireRole({ collection: 1, task: 0 }),
  addActivityToFeed
);
router.get(
  "/",
  authenticate,
  requireRole({ collection: 1, task: 0 }),
  findEventByName
);
router.put(
  "/:id",
  authenticate,
  requireRole({ collection: 1, task: 0 }),
  updateEvent
);
router.delete(
  "/:id",
  authenticate,
  requireRole({ collection: 1, task: 1 }),
  deleteEvent
);
router.put(
  "/:id",
  authenticate,
  requireRole({ collection: 1, task: 0 }),
  updateStatus
);
router.post(
  "/:id",
  authenticate,
  requireRole({ collection: 1, task: 0 }),
  checkPassword
);

module.exports = router;
