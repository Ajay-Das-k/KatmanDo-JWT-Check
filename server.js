// server.js
// Load environment variables from .env file
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const config = require("./config/config");
const auth = require("./middleware/auth");

// Initialize express app
const app = express();

// Enhanced Middleware
app.use(helmet()); // Security headers
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Logging

// Routes
app.use("/api/auth", authRoutes);



// Protected route that requires JWT
router.get("/protected", auth, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hai I am tokened",
    user: req.user, // This contains the decoded JWT payload
  });
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Server error",
  });
});

// Connect to MongoDB with improved options
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
