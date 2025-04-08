// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan"); // <-- Add this line
const authRoutes = require("./routes/authRoutes");
const config = require("./config/config");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // <-- Add this line to log requests

// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
