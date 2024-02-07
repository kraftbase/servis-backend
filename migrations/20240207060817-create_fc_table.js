'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('FCEntities',{
    FC:{
      type: Sequelize.STRING,
      primaryKey:true,
      allowNull:false,
      validate:{
          max:3
      },
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
   await queryInterface.dropTable('FCEntities')
  }
};
