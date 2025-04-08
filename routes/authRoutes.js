// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Login route
router.post("/login", authController.login);

router.get("/protected", auth, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hai I am tokened",
    user: req.user, // This contains the decoded JWT payload
  });
});

module.exports = router;
