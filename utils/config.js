// Import the dotenv module to load environment variables from .env file
const dotenv = require("dotenv");

// Load environment variables from .env file
const envFound = dotenv.config();

// If there's an error loading the environment variables, throw an error and crash the process
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

// Configuration object containing various environment variables
const config = {
  // Port number for the server to listen on, default is 3000
  PORT: process.env.PORT || 3000,
  // Secret key for JWT token generation, default is a random string
  JWT_SECRET: process.env.JWT_SECRET || "D6FnhgHSJADAKSDHAdsSsJDf23vds",
  // Expiry time for JWT tokens, default is 4 days
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "4d",
  // Environment mode, default is 'dev'
  NODE_ENV: process.env.NODE_ENV || "dev",
  // Schema name for PI entities
  PI_SCHEMA: "PI",
  // Schema name for user entities
  USER_SCHEMA: "USER",
};

// Export the configuration object
module.exports = config;
