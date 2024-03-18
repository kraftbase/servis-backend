// Import the bcrypt library for password hashing and comparison
const bcrypt = require("bcrypt");
// Import the configuration object
const config = require("../utils/config");

// Function to encrypt a password
exports.encryptPassword = async (password) => {
  // Generate a salt for password hashing with a complexity of 10
  const salt = await bcrypt.genSalt(10);
  // Hash the password using the generated salt
  const encryptedPassword = await bcrypt.hash(password, salt);

  // Return the encrypted password
  return encryptedPassword;
};

// Function to compare a provided password with a saved password
exports.comparePassword = async (providedPassword, savedPassword) => {
  // Compare the provided password with the saved password
  return await bcrypt.compare(providedPassword, savedPassword);
};
