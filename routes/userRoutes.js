const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/userController");
const verifyToken = require("../controllers/middleware");
const router = express.Router();

router.post(
  "/",
  [
    check("name", "Name is required").isString().notEmpty(),
    check("email", "Email is required").isEmail().notEmpty(),
    check("password", "Password is required min 8 characters")
      .isString()
      .notEmpty()
      .isLength({ min: 8 }),
    check("typeOfUser", "User type is required").isString().notEmpty(),
  ],
  userController.createUser
);
router.get("/", verifyToken, userController.getAllUsers);
router.get("/:id", verifyToken, userController.getUserById);
router.patch("/:id", verifyToken, userController.updateUserById);
router.delete("/:id", verifyToken, userController.deleteUserById);

module.exports = router;
