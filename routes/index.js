const express = require("express");
const PIRoutes = require("../routes/PIRoutes");
const userRoutes = require("../routes/userRoutes");
const fcRoutes = require("./fcRoutes");
const materialRoutes = require("./materialRoutes");
const supplierRoutes = require("./suppliersRoutes");
const authRoutes = require("./authRoutes");
const bankRoutes = require("./bankRoutes");
const countryRoutes = require("./countryRoutes");

const router = express.Router();

router.use("/pi", PIRoutes);
router.use("/user", userRoutes);
router.use("/fc", fcRoutes);
router.use("/auth", authRoutes);
router.use("/material", materialRoutes);
router.use("/supplier", supplierRoutes);
router.use("/bank", bankRoutes);
router.use("/country", countryRoutes);

module.exports = router;
