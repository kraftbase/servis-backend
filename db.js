const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'oracle',
  host: 'localhost',
  port: 1521, // Replace with your Oracle database port
  username: 'system',
  password: 'Oracle_123',
  database: 'ORCLCDB',
  define: {
    timestamps: true, 
  },
});

module.exports = sequelize;
