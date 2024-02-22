"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("countryEntities", {
      countryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      FC: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "FCEntities",
          key: "FC",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      COUNTRY: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      countryLogo: {
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
    await queryInterface.dropTable("countryEntities");
  },
};
