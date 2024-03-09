const validator = require("express-validator");
const userEntity = require("../entities/userEntity");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

exports.createUser = async (req, res) => {
  const validantionErrors = validator.validationResult(req);
  if (!validantionErrors.isEmpty()) {
    console.log(validantionErrors);
    return res.status(400).json({ message: validantionErrors.array() });
  }
  try {
    const newUserData = req.body;

    const exsitingUser = await userEntity.findOne({
      where: { email: newUserData.email },
    });

    if (exsitingUser) {
      return res.status(400).json({ message: "User already exsist" });
    }

    const newUser = await userEntity.create(newUserData);

    const token = jwt.sign(
      { userId: newUser.userId },
      process.env.JWT_SECERET_KEY,
      { expiresIn: "1d" }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secur: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });

    res.json(newUser);
  } catch (error) {
    console.log("Error in creating user", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const rowsAffected = await userEntity.destroy({
      where: { userId: userId },
    });
    if (rowsAffected > 0) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.log("error in delete user controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const newData = req.body;
    console.log("new data for user is: ", newData);
    const existingUser = await userEntity.findByPk(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "No user found" });
    }

    // Check if new password is provided in the request body and is truthy
    if (newData.password) {
      // If password is provided and truthy, update it along with other fields
      const updatedUser = await userEntity.update(newData, {
        where: { userId: userId },
        individualHooks: true,
      });
      res.json({ message: "User updated successfully" });
    } else {
      // If password is not provided or is falsy, update other fields without changing the password
      const { password, ...updatedDataWithoutPassword } = newData;

      const updatedUser = await userEntity.update(updatedDataWithoutPassword, {
        where: { userId: userId },
        individualHooks: true,
      });

      res.json({ message: "User updated successfully" });
    }
  } catch (error) {
    console.log("Error in update user controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
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
    console.log("error in find  user by id controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const search = req.query.search ? req.query.search : "";
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
    console.log("error in find  pi controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
