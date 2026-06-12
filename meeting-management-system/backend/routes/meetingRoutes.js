const express = require("express");

const router = express.Router();

const { createMeeting } = require("../controllers/meetingController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, roleMiddleware("admin"), createMeeting);

module.exports = router;
