// Importing required modules
const express = require("express");
const { check, body } = require("express-validator");
const PIController = require("../controllers/PIController");
const verifyToken = require("../controllers/middleware");

// Creating an Express Router instance
const router = express.Router();

// Configuring multer for file upload
const multer = require("multer");
const { uploadToStorage } = require("../controllers/fileUploads");
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint for creating a new PI
router.post(
  "/",
  verifyToken, // Middleware for token verification
  upload.single("documents"), // File upload middleware
  uploadToStorage, // Middleware to upload file to storage
  PIController.generatePI // Controller method for generating PI
);

// Endpoint for retrieving all PIs
router.get("/", verifyToken, PIController.getAllPIs);

// Endpoint for counting PIs
router.get("/count", verifyToken, PIController.getPiCounts);

// Endpoint for updating a specific PI by ID
router.patch(
  "/:id",
  verifyToken, // Middleware for token verification
  upload.single("documents"), // File upload middleware
  PIController.updatePIById // Controller method for updating PI
);

// Endpoint for deleting a specific PI by ID
router.delete("/:id", verifyToken, PIController.deletePIById);

// Endpoint for retrieving a specific PI by ID
router.get("/:id", verifyToken, PIController.getPIById);

// Exporting the router
module.exports = router;
