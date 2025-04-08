// controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");

exports.login = async (req, res) => {
  try {
    const { email, scriptId } = req.body;

    if (!email || !scriptId) {
      return res.status(400).json({
        success: false,
        error: "Email and scriptId are required",
      });
    }

    // Create userId by combining email and scriptId
    const userId = `${email}-${scriptId}`;

    // Check if user exists
    let user = await User.findOne({ userId });

    // If user doesn't exist, create a new one
    if (!user) {
      user = new User({
        email,
        scriptId,
        userId,
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      config.jwtSecret,
      { expiresIn: config.jwtExpiration }
    );

    // Return success with token
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error during authentication",
    });
  }
};
