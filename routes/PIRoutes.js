const express = require("express");
const { check, body } = require("express-validator");
const PIController = require("../controllers/PIController");
const verifyToken = require("../controllers/middleware");
const router = express.Router();

const multer = require("multer");
const { uploadToStorage } = require("../controllers/fileUploads");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  verifyToken,
  upload.single("documents"),
  uploadToStorage,
  PIController.generatePI
);

router.get("/", verifyToken, PIController.getAllPIs);
router.get("/count", verifyToken, PIController.getPiCounts);
router.patch("/:id", verifyToken, PIController.updatePIById);
router.delete("/:id", verifyToken, PIController.deletePIById);
router.get("/:id", verifyToken, PIController.getPIById);

module.exports = router;
