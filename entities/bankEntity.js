// Import the required modules
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Define the bank entity model
const bankEntity = sequelize.define("bankEntities", {
  // Define the bankId field with type INTEGER and auto-incrementing
  bankId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    // This field is optional, it will auto-increment by default in most databases
  },
  // Define the bankCode field with type STRING and set it as the primary key
  bankCode: {
    type: DataTypes.STRING,
    primaryKey: true,
    // Validate the length of the bankCode to be maximum 10 characters
    validate: {
      max: 10,
    },
  },
  // Define the bankName field with type STRING and enforce uniqueness constraint
  bankName: {
    type: DataTypes.STRING,
    unique: true,
  },
  // Define the bankLogo field with type TEXT
  bankLogo: {
    type: DataTypes.TEXT,
  },
});

// Export the bank entity model
module.exports = bankEntity;
