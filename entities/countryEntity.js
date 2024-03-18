// Import necessary modules
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Define the Country entity model
const countryEntity = sequelize.define("countryEntities", {
  // Define attributes of the country entity
  countryId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  FC: {
    type: DataTypes.STRING,
    allowNull: false,
    // Define a foreign key reference to FCEntities table
    references: {
      model: "FCEntities", // Name of the referenced model
      key: "FC", // Name of the referenced column in the FCEntities table
    },
    onDelete: "CASCADE", // Define cascading delete behavior
    onUpdate: "CASCADE", // Define cascading update behavior
  },
  COUNTRY: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true, // Define COUNTRY as primary key
  },
  countryLogo: {
    type: DataTypes.TEXT,
  },
});

// Export the country entity model
module.exports = countryEntity;
