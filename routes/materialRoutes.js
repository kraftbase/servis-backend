const express = require("express");
const { check } = require("express-validator");
const materialsController = require('../controllers/materialsController');
const verifyToken = require("../controllers/middleware");
const router = express.Router();

router.get('/',verifyToken,materialsController.getAllMaterials)
router.post('/',check('MATERIAL_CATAGORY','Material is required').notEmpty(),verifyToken,materialsController.createMaterials)
verifyToken,
module.exports = router