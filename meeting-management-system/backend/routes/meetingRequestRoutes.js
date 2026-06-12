const express = require("express");

const router = express.Router();

const {
  createMeetingRequest,
  getMeetingRequests,
  approveMeetingRequest,
  rejectMeetingRequest,
} = require("../controllers/meetingRequestController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("client"),
  createMeetingRequest,
);

router.get("/", authMiddleware, roleMiddleware("admin"), getMeetingRequests);

router.put(
  "/approve/:id",
  authMiddleware,
  roleMiddleware("admin"),
  approveMeetingRequest,
);

router.put(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("admin"),
  rejectMeetingRequest,
);

module.exports = router;
