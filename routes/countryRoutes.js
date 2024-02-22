const express = require("express");
const verifyToken = require("../controllers/middleware");
const multer = require("multer");
const { uploadToStorage } = require("../controllers/fileUploads");
const {
  createCountry,
  getAllCountries,
} = require("../controllers/countryController");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  verifyToken,
  upload.single("countryLogo"),
  uploadToStorage,
  createCountry
);
router.get("/", verifyToken, getAllCountries);

module.exports = router;
