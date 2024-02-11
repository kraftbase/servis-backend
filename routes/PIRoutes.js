const express = require("express");
const { check } = require("express-validator");
const PIController = require("../controllers/PIController");
const verifyToken = require("../controllers/middleware");
const router = express.Router();

router.post(
  "/",
  [
    check("PI_NUMBER", "Pi number is required").isString().notEmpty(),
    check("SUPPLIER_NAME", "suppliers name is required").isString().notEmpty(),
    check("MATERIAL_CATAGORY", "material CATAGORY is required")
      .isString()
      .notEmpty(),
    check("PI_VALUE", "value is required").isNumeric().notEmpty(),
    check("FC", "Currency type is required").isLength({ max: 3 }).notEmpty(),
  ],verifyToken,
  PIController.generatePI
);
router.get("/", verifyToken,PIController.getAllPIs);
router.get("/count", verifyToken,PIController.getPiCounts);
router.patch("/:id", verifyToken,PIController.updatePIById);
router.delete("/:id", verifyToken,PIController.deletePIById);
router.get("/:id", verifyToken,PIController.getPIById);

module.exports = router;
