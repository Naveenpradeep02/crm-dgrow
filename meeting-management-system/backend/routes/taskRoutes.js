const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getEmployeeTasks,
  updateTaskStatus,
  updateTaskProgress,
} = require("../controllers/taskController");

router.post("/", authMiddleware, roleMiddleware("admin"), createTask);

router.get("/", authMiddleware, getTasks);

router.put("/:id", authMiddleware, roleMiddleware("admin"), updateTask);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteTask);
router.get("/employee", authMiddleware, getEmployeeTasks);

router.put("/status/:id", authMiddleware, updateTaskStatus);
router.put("/progress/:id", authMiddleware, updateTaskProgress);

module.exports = router;
