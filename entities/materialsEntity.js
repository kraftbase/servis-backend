// Import necessary modules
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Define the Material entity model
const materialEntity = sequelize.define("materialEntities", {
  // Define attributes of the material entity
  MATERIAL_CATAGORY: {
    type: DataTypes.STRING,
    primaryKey: true, // Define MATERIAL_CATAGORY as primary key
    allowNull: false, // MATERIAL_CATAGORY cannot be null
  },
});

// Export the material entity model
module.exports = materialEntity;
