const express = require("express");
const { check } = require("express-validator");
const FCController = require('../controllers/FCController');
const verifyToken = require("../controllers/middleware");
const router = express.Router();

router.get('/',verifyToken,FCController.getAllFc)
router.post('/',check('FC','Fc is required and can not be more than 3 characters').isLength({max:3}).notEmpty(),verifyToken,FCController.createFC)

module.exports = router