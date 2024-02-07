const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const suplierEntity = require('./supplierEntity');
const materialEntity = require('./materialsEntity');
const FCEntity = require('./FCEntity');

const PIEntity = sequelize.define('PIEntity',{
    PI_NUMBER: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      PI_DATE: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
      SUPPLIER_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'suplierEntities', // Assuming the name of your supplier table
          key: 'SUPPLIER',            // Assuming the primary key of supplierEntities is 'SUPPLIER'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      MATERIAL_CATAGORY: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'materialEntities',  // Assuming the name of your material table
          key: 'MATERIAL_CATAGORY',  // Assuming the primary key of materialEntities is 'MATERIAL_CATAGORY'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      FC: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'FCEntities',       // Assuming the name of your FC table
          key: 'FC',                 // Assuming the primary key of FCEntities is 'FC'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      PI_VALUE: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      Bank_Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
})



module.exports = PIEntity