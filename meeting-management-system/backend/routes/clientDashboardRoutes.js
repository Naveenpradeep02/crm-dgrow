const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getClientDashboard,
} = require("../controllers/clientDashboardController");

router.get("/", authMiddleware, getClientDashboard);

module.exports = router;
