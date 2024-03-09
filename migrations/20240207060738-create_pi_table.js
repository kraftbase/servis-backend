"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PIEntities", {
      PI_NUMBER: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      PI_DATE: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
      SUPPLIER_NAME: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "supplierEntities", // Updated to lowercase
          key: "SUPPLIER",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      MATERIAL_CATAGORY: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "materialEntities",
          key: "MATERIAL_CATAGORY",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      FC: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "FCEntities",
          key: "FC",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      PI_VALUE: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      bankDetails: {
        type: Sequelize.STRING, // Change to the correct data type if it's not a string
        allowNull: true,
        references: {
          model: "bankEntities",
          key: "bankCode", // Change this to the correct field in bankEntities
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "countryEntities",
          key: "COUNTRY",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      isPriority: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      documents: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status:{
        type:Sequelize.STRING,
        defaultValue: 'pending'
      },
      isPriority:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      country:{
        type:Sequelize.STRING
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
    await queryInterface.dropTable("PIEntities");
  },
};
