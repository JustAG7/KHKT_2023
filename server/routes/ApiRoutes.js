const express = require("express");
const router = express.Router();
const Auth = require("./AuthRoutes");
const userRoutes = require("./UserRoutes");
const departmentRoutes = require("./DepartmentRoutes");
const EventRoutes = require("./EventRoutes");

router.use("/users", userRoutes);
router.use("/auths", Auth);
router.use("/departments", departmentRoutes);
router.use("/events", EventRoutes);

module.exports = router;