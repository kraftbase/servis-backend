const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const suplierEntity = require("./supplierEntity");
const materialEntity = require("./materialsEntity");
const FCEntity = require("./FCEntity");
const bankEntity = require("./bankEntity");
const countryEntity = require("./countryEntity");

const PIEntity = sequelize.define("PIEntities", {
  PI_NUMBER: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  PI_DATE: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
  SUPPLIER_NAME: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "suplierEntities",
      key: "SUPPLIER",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  MATERIAL_CATAGORY: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "materialEntities",
      key: "MATERIAL_CATAGORY",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  FC: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "FCEntities",
      key: "FC",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  PI_VALUE: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
  bankDetails: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "bankEntities",
      key: "bankCode",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "countryEntities",
      key: "COUNTRY",
      as: "COUNTRY",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  isPriority: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  documents: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

PIEntity.belongsTo(suplierEntity, {
  foreignKey: "SUPPLIER_NAME",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PIEntity.belongsTo(materialEntity, {
  foreignKey: "MATERIAL_CATAGORY",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PIEntity.belongsTo(FCEntity, {
  foreignKey: "FC",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PIEntity.belongsTo(bankEntity, {
  foreignKey: "bankDetails",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PIEntity.belongsTo(countryEntity, {
  foreignKey: "country",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = PIEntity;
