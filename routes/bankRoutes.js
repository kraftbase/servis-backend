// Import necessary modules
const express = require("express");
const { check, validationResult } = require("express-validator");
const verifyToken = require("../controllers/middleware"); // Assuming this middleware is defined elsewhere
const multer = require("multer");
const { uploadToStorage } = require("../controllers/fileUploads");
const { createBank, getAllBanks } = require("../controllers/bankController");

// Create an instance of the Express router
const router = express.Router();

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// POST route for creating a bank
router.post(
  "/",
  verifyToken, // Middleware to verify token
  upload.single("bankLogo"), // Upload bank logo file
  uploadToStorage, // Function to upload file to storage
  createBank // Controller function to create bank
);

// GET route to fetch all banks
router.get("/", verifyToken, getAllBanks); // Middleware to verify token

// Export the bank router
module.exports = router;
