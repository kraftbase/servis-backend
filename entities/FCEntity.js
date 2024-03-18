// Import necessary modules
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Define the FCEntity model
const FCEntity = sequelize.define("FCEntities", {
  // Define attributes of the FCEntity
  FC: {
    type: DataTypes.STRING,
    primaryKey: true, // Define FC as primary key
    allowNull: false, // FC cannot be null
    validate: {
      max: 3, // Validate the length of FC is at most 3 characters
    },
  },
});

// Export the FCEntity model
module.exports = FCEntity;
