const { Sequelize } = require("sequelize");

// Creating a new Sequelize instance with Oracle configuration
const sequelize = new Sequelize({
  dialect: "oracle", // Using Oracle dialect
  host: process.env.ORACLE_HOST, // Oracle database host
  port: 1521, // Oracle database port
  username: process.env.ORACLE_USERNAME, // Oracle database username
  password: process.env.ORACLE_PWD, // Oracle database password
  database: process.env.ORACLE_SID, // Oracle database SID
  define: {
    timestamps: true, // Adding timestamps to models by default
  },
});

module.exports = sequelize;
