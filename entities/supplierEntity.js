// Import necessary modules
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const PIEntity = require("./piEntity");

// Define the supplier entity model
const suplierEntity = sequelize.define("supplierEntities", {
  SUPPLIER: {
    type: DataTypes.STRING,
    primaryKey: true, // Define SUPPLIER as primary key
    allowNull: false, // Disallow null values for SUPPLIER
  },
});

// Export the supplier entity model
module.exports = suplierEntity;
