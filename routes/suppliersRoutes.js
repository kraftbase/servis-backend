const express = require("express");
const { check } = require("express-validator");
const supplierController = require('../controllers/suppliersController');
const verifyToken = require("../controllers/middleware");
const router = express.Router();

router.get('/',verifyToken,supplierController.getAllSupplier)
router.post('/',check('SUPPLIER','Suppliers is required ').notEmpty(),verifyToken,supplierController.createSupplier)

module.exports = router