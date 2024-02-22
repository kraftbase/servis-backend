const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const bankEntity = sequelize.define("bankEntities", {
  bankId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  bankCode: {
    type: DataTypes.STRING,
    primaryKey: true,
    validate: {
      max: 10,
    },
  },
  bankName: {
    type: DataTypes.STRING,
    unique: true,
  },
  bankLogo: {
    type: DataTypes.TEXT,
  },
});

module.exports = bankEntity;
