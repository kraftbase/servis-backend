const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const countryEntity = sequelize.define("countryEntities", {
  countryId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  FC: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "FCEntities",
      key: "FC",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  COUNTRY: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  countryLogo: {
    type: DataTypes.TEXT,
  },
});

module.exports = countryEntity;
