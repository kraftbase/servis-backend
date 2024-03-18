// Importing required modules
const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/userController");
const verifyToken = require("../controllers/middleware");

// Creating an Express Router instance
const router = express.Router();

// Endpoint for creating a new user
router.post(
  "/",
  [
    check("name", "Name is required").isString().notEmpty(), // Validation for name field
    check("email", "Email is required").isEmail().notEmpty(), // Validation for email field
    check("password", "Password is required min 8 characters")
      .isString()
      .notEmpty()
      .isLength({ min: 8 }), // Validation for password field
    check("typeOfUser", "User type is required").isString().notEmpty(), // Validation for typeOfUser field
  ],
  userController.createUser // Controller method for creating a user
);

// Endpoint for retrieving all users
router.get("/", verifyToken, userController.getAllUsers);

// Endpoint for retrieving a user by ID
router.get("/:id", verifyToken, userController.getUserById);

// Endpoint for updating a user by ID
router.patch("/:id", verifyToken, userController.updateUserById);

// Endpoint for deleting a user by ID
router.delete("/:id", verifyToken, userController.deleteUserById);

// Exporting the router
module.exports = router;
