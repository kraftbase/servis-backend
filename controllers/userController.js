// Importing necessary modules and entities for user operations
const validator = require("express-validator");
const userEntity = require("../entities/userEntity");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

// Controller function to create a new user
exports.createUser = async (req, res) => {
  // Perform input validation
  const validationErrors = validator.validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    return res.status(400).json({ message: validationErrors.array() });
  }
  try {
    // Extract new user data from the request
    const newUserData = req.body;

    // Check if the user already exists in the database
    const existingUser = await userEntity.findOne({
      where: { email: newUserData.email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create the new user entity in the database
    const newUser = await userEntity.create(newUserData);

    // Generate JWT token for authentication
    const token = jwt.sign(
      { userId: newUser.userId },
      process.env.JWT_SECRET_KEY || "servis",
      { expiresIn: "1d" }
    );

    // Set the token in a cookie for subsequent requests
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json(newUser);
  } catch (error) {
    // Handle errors and send appropriate error response
    console.log("Error in creating user", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete the user from the database based on user ID
    const rowsAffected = await userEntity.destroy({
      where: { userId: userId },
    });
    if (rowsAffected > 0) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    // Handle errors and send appropriate error response
    console.log("Error in delete user controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const newData = req.body;
    console.log("new data for user is: ", newData);

    // Find the existing user by user ID
    const existingUser = await userEntity.findByPk(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "No user found" });
    }

    // Check if new password is provided in the request body and is truthy
    if (newData.password) {
      // If password is provided and truthy, update it along with other fields
      await userEntity.update(newData, {
        where: { userId: userId },
        individualHooks: true,
      });
      res.json({ message: "User updated successfully" });
    } else {
      // If password is not provided or is falsy, update other fields without changing the password
      const { password, ...updatedDataWithoutPassword } = newData;

      await userEntity.update(updatedDataWithoutPassword, {
        where: { userId: userId },
        individualHooks: true,
      });

      res.json({ message: "User updated successfully" });
    }
  } catch (error) {
    // Handle errors and send appropriate error response
    console.log("Error in update user controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by user ID and return specific attributes
    const foundUser = await userEntity.findByPk(userId, {
      attributes: [
        ["userId", "userId"],
        ["name", "name"],
        ["email", "email"],
        ["typeOfUser", "typeOfUser"],
      ],
    });
    if (!foundUser || foundUser.length === 0) {
      return res.status(404).json({ message: "No user found for the id" });
    }
    res.json(foundUser);
  } catch (error) {
    // Handle errors and send appropriate error response
    console.log("Error in find user by id controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const search = req.query.search ? req.query.search : "";

    // Find users in the database based on search query and return specific attributes
    const allUsers = await userEntity.findAll({
      where: { name: { [Op.like]: `%${search}%` } },
      attributes: [
        ["userId", "userId"],
        ["name", "name"],
        ["email", "email"],
        ["typeOfUser", "typeOfUser"],
      ],
    });
    res.json(allUsers);
  } catch (error) {
    // Handle errors and send appropriate error response
    console.log("Error in find user controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
