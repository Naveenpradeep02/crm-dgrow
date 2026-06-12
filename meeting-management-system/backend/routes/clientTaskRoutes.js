const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getClientTasks } = require("../controllers/clientTaskController");

router.get("/", authMiddleware, getClientTasks);

module.exports = router;
