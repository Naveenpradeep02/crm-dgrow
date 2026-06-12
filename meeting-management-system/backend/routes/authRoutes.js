const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  login,
  changePassword,
  resetPassword,
  forgotPassword,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register-admin", registerAdmin);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
