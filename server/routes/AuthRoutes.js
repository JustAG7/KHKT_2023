const express = require("express");
const router = express.Router();
const {login, register, findByUser} = require("../controllers/AuthController");

router.post("/login", login);
router.post("/register", register);
router.get("/user", findByUser);

module.exports = router;