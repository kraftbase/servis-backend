'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('supplierEntities',{
    SUPPLIER:{
      type: Sequelize.STRING,
      primaryKey:true,
      allowNull:false,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("supplierEntities");

  }
};
