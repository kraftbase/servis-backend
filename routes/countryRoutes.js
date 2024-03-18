// Import necessary modules
const express = require("express");
const verifyToken = require("../controllers/middleware"); // Assuming this middleware is defined elsewhere
const multer = require("multer");
const { uploadToStorage } = require("../controllers/fileUploads");
const {
  createCountry,
  getAllCountries,
} = require("../controllers/countryController");

// Create an instance of the Express router
const router = express.Router();

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// POST route for creating a country
router.post(
  "/",
  verifyToken, // Middleware to verify token
  upload.single("countryLogo"), // Upload country logo file
  uploadToStorage, // Function to upload file to storage
  createCountry // Controller function to create country
);

// GET route to fetch all countries
router.get("/", verifyToken, getAllCountries); // Middleware to verify token

// Export the country router
module.exports = router;
