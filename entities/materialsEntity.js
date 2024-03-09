const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const PIEntity = require("./piEntity");

const materialEntity = sequelize.define("materialEntities", {
  MATERIAL_CATAGORY: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = materialEntity;
