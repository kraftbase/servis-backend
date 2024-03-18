// Importing JWT module
const jwt = require("jsonwebtoken");

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  // Extracting token from request cookies
  const token = req.cookies["auth_token"];

  // If token doesn't exist, return unauthorized status
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verifying the token using JWT with the provided secret key
    const decoded = jwt.verify(token, process.env.JWT_SECERET_KEY);

    // Storing the decoded user ID in request object for further use
    req.userId = decoded.userId;

    // Proceed to the next middleware
    next();
  } catch (error) {
    // If token verification fails, return unauthorized status
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Exporting the verifyToken middleware function
module.exports = verifyToken;
