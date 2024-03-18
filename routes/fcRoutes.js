// Import necessary modules
const express = require("express");
const { check } = require("express-validator");
const FCController = require("../controllers/FCController");
const verifyToken = require("../controllers/middleware");

// Create an instance of the Express router
const router = express.Router();

// GET route to fetch all FCs
router.get("/", verifyToken, FCController.getAllFc);

// POST route to create a new FC
router.post(
  "/",
  check("FC", "FC is required and cannot be more than 3 characters")
    .isLength({ max: 3 })
    .notEmpty(), // Validation check for FC
  verifyToken, // Middleware to verify token
  FCController.createFC // Controller function to create FC
);

// Export the router
module.exports = router;
