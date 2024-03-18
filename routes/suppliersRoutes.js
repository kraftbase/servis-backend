// Importing required modules
const express = require("express");
const { check } = require("express-validator");
const supplierController = require("../controllers/suppliersController");
const verifyToken = require("../controllers/middleware");

// Creating an Express Router instance
const router = express.Router();

// Endpoint for retrieving all suppliers
router.get("/", verifyToken, supplierController.getAllSupplier);

// Endpoint for creating a new supplier
router.post(
  "/",
  check("SUPPLIER", "Supplier is required").notEmpty(), // Validation middleware for supplier data
  verifyToken, // Middleware for token verification
  supplierController.createSupplier // Controller method for creating a supplier
);

// Exporting the router
module.exports = router;
