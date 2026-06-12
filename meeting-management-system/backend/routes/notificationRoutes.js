const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getNotifications,
  markAsRead,
  getUnreadCount,
} = require("../controllers/notificationController");

router.get("/", authMiddleware, getNotifications);

router.put("/:id/read", authMiddleware, markAsRead);
router.get("/unread-count", authMiddleware, getUnreadCount);

module.exports = router;
