// Import necessary modules and route files
const express = require("express");
const PIRoutes = require("../routes/PIRoutes");
const userRoutes = require("../routes/userRoutes");
const fcRoutes = require("./fcRoutes");
const materialRoutes = require("./materialRoutes");
const supplierRoutes = require("./suppliersRoutes");
const authRoutes = require("./authRoutes");
const bankRoutes = require("./bankRoutes");
const countryRoutes = require("./countryRoutes");

// Create an instance of the Express router
const router = express.Router();

// Delegate routes to their respective route files using router.use()
router.use("/pi", PIRoutes); // Routes related to PI
router.use("/user", userRoutes); // Routes related to users
router.use("/fc", fcRoutes); // Routes related to FC
router.use("/auth", authRoutes); // Routes related to authentication
router.use("/material", materialRoutes); // Routes related to materials
router.use("/supplier", supplierRoutes); // Routes related to suppliers
router.use("/bank", bankRoutes); // Routes related to banks
router.use("/country", countryRoutes); // Routes related to countries

// Export the router
module.exports = router;
