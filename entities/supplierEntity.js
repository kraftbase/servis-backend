const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const PIEntity = require("./piEntity");

const suplierEntity = sequelize.define("supplierEntities", {
  SUPPLIER: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = suplierEntity;
