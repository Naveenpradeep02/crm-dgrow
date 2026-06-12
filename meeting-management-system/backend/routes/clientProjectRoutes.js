const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getClientProjects } = require("../controllers/clientProjectController");

router.get("/", authMiddleware, getClientProjects);

module.exports = router;
