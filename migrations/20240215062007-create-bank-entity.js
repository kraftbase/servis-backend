"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bankEntities", {
      bankId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      bankCode: {
        type: Sequelize.STRING,
        primaryKey: true,
        validate: {
          max: 10,
        },
      },
      bankName: {
        type: Sequelize.STRING,
        unique: true,
      },
      bankLogo: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });

    // Add any additional indexes or constraints here if needed
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bankEntities");
  },
};
