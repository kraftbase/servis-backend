// Import necessary modules
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const suplierEntity = require("./supplierEntity");
const materialEntity = require("./materialsEntity");
const FCEntity = require("./FCEntity");
const bankEntity = require("./bankEntity");
const countryEntity = require("./countryEntity");

// Define the PI entity model
const PIEntity = sequelize.define("PIEntities", {
  // Define attributes of the PI entity
  PI_NUMBER: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true, // Define PI_NUMBER as primary key
  },
  PI_DATE: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(), // Set default value to current date
  },
  SUPPLIER_NAME: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "suplierEntities", // Define reference to supplier entity
      key: "SUPPLIER",
    },
    onUpdate: "CASCADE", // Update reference on cascade
    onDelete: "CASCADE", // Delete reference on cascade
  },
  MATERIAL_CATAGORY: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "materialEntities", // Define reference to material entity
      key: "MATERIAL_CATAGORY",
    },
    onUpdate: "CASCADE", // Update reference on cascade
    onDelete: "CASCADE", // Delete reference on cascade
  },
  FC: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "FCEntities", // Define reference to FC entity
      key: "FC",
    },
    onUpdate: "CASCADE", // Update reference on cascade
    onDelete: "CASCADE", // Delete reference on cascade
  },
  PI_VALUE: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
  bankDetails: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: "bankEntities", // Define reference to bank entity
      key: "bankCode",
    },
    onUpdate: "CASCADE", // Update reference on cascade
    onDelete: "CASCADE", // Delete reference on cascade
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "countryEntities", // Define reference to country entity
      key: "COUNTRY",
      as: "COUNTRY",
    },
    onUpdate: "CASCADE", // Update reference on cascade
    onDelete: "CASCADE", // Delete reference on cascade
  },
  isPriority: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  documents: {
    type: DataTypes.TEXT,
  },
});

// Define associations between PI entity and other entities
PIEntity.belongsTo(suplierEntity, {
  foreignKey: "SUPPLIER_NAME", // Define foreign key for supplier entity
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PIEntity.belongsTo(materialEntity, {
  foreignKey: "MATERIAL_CATAGORY", // Define foreign key for material entity
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PIEntity.belongsTo(FCEntity, {
  foreignKey: "FC", // Define foreign key for FC entity
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PIEntity.belongsTo(bankEntity, {
  foreignKey: "bankDetails", // Define foreign key for bank entity
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PIEntity.belongsTo(countryEntity, {
  foreignKey: "country", // Define foreign key for country entity
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Export the PI entity model
module.exports = PIEntity;
