// Import necessary modules
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../controllers/middleware"); // Assuming this middleware is defined elsewhere
const userEntity = require("../entities/userEntity");

// Create an instance of the Express router
const router = express.Router();

// POST route for user login
router.post(
  "/login",
  [
    // Validation checks for email and password
    check("email", "Email is Required").isEmail(),
    check("password", "Password is required").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // Validate request body against defined checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ message: errors.array() });
    }
    // Destructure email and password from request body
    const { email, password } = req.body;
    // Determine if application is in production environment
    const isProduction = process.env.NODE_ENV === "production";
    try {
      // Find user by email in the database
      const user = await userEntity.findOne({
        where: { email: email },
      });
      // If no user found, return error
      if (!user) {
        return res.status(404).json({ message: "Invalid Credentials" });
      }
      // Compare provided password with hashed password in database
      const isMatch = await bcrypt.compare(password, user.password);
      // If passwords don't match, return error
      if (!isMatch) {
        return res.status(404).json({ message: "Invalid Credentials" });
      }
      // Generate JWT token for authentication
      const token = jwt.sign(
        { userId: user.userId },
        process.env.JWT_SECERET_KEY,
        {
          expiresIn: "1d",
        }
      );
      // Set authentication token as cookie in response
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: isProduction,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: isProduction ? "None" : "Lax",
      });
      // Return user ID in response
      return res.status(200).json({ userId: user.userId });
    } catch (error) {
      console.log(error);
      // If an error occurs, return error message
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

// GET route to verify authentication token
router.get("/verify-token", verifyToken, (req, res) => {
  // Return user ID from token verification
  res.status(200).send({ userId: req.userId });
});

// POST route to logout user
router.post("/logout", async (req, res) => {
  // Clear authentication token cookie
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  // Send response
  res.send();
});

// Export the authentication router
module.exports = router;
