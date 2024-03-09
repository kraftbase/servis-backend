const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const PIEntity = require("./piEntity");

const FCEntity = sequelize.define("FCEntities", {
  FC: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      max: 3,
    },
  },
});

module.exports = FCEntity;
