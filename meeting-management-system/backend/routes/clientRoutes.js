const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createClient,
  getClients,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

router.post("/", authMiddleware, roleMiddleware("admin"), createClient);

router.get("/", authMiddleware, roleMiddleware("admin"), getClients);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateClient);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteClient);

module.exports = router;
