// config/config.js
module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION || "24h",
  nodeEnv: process.env.NODE_ENV || "development",
};
