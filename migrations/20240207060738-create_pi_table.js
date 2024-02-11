'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PIEntities', {
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
          model: 'supplierEntities', // Assuming the name of your supplier table
          key: 'SUPPLIER',            // Assuming the primary key of supplierEntities is 'SUPPLIER'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      MATERIAL_CATAGORY: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'materialEntities',  // Assuming the name of your material table
          key: 'MATERIAL_CATAGORY',  // Assuming the primary key of materialEntities is 'MATERIAL_CATAGORY'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      FC: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'FCEntities',       // Assuming the name of your FC table
          key: 'FC',                 // Assuming the primary key of FCEntities is 'FC'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      PI_VALUE: {
        type: Sequelize.NUMBER,
        allowNull: true,
      },
      Bank_Name: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('PIEntities');
  }
};
