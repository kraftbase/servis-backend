const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "oracle",
  host: process.env.ORACLE_HOST,
  port: 1521, // Replace with your Oracle database port
  username: process.env.ORACLE_USERNAME,
  password: process.env.ORACLE_PWD,
  database: process.env.ORACLE_SID,
  define: {
    timestamps: true,
  },
});

module.exports = sequelize;
