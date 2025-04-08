// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  scriptId: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to ensure userId is created correctly
UserSchema.pre("save", function (next) {
  if (!this.userId) {
    this.userId = `${this.email}-${this.scriptId}`;
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
