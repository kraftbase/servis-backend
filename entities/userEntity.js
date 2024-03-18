// Import necessary modules
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../db");
const { encryptPassword } = require("../utils/utilityFunctions");

// Define the user entity model
const userEntity = sequelize.define(
  "userEntities", // Table name
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Define userId as primary key
      autoIncrement: true, // Enable auto-increment for userId
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Disallow null values for name
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null values for email
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Disallow null values for password
    },
    typeOfUser: {
      type: DataTypes.STRING,
      allowNull: false, // Disallow null values for typeOfUser
    },
  },
  {
    hooks: {
      // Before creating a user, encrypt the password
      beforeCreate: async (user, options) => {
        if (user.password) {
          user.password = await encryptPassword(user.password);
        }
      },
      // Before updating a user, check if password is changed and encrypt it
      beforeUpdate: async (user, options) => {
        if (user.changed("password")) {
          user.password = await encryptPassword(user.password);
        }
      },
    },
  }
);

// Export the user entity model
module.exports = userEntity;
