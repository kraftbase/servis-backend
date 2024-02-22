const express = require("express");
const { check, validationResult } = require("express-validator");
const verifyToken = require("../controllers/middleware");
const multer = require("multer");
const { uploadToStorage } = require("../controllers/fileUploads");
const { createBank, getAllBanks } = require("../controllers/bankController");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  verifyToken,
  upload.single("bankLogo"),
  uploadToStorage,
  createBank
);
router.get("/", verifyToken, getAllBanks);

module.exports = router;
