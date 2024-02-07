const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../db");

const userEntity = sequelize.define(
  "userEntity",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeOfUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user, options) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 8);
        }
      },
     beforeUpdate: async(user,options)=>{
        console.log('calling before update hook')
        if(user.changed('password')){
            console.log('hasing password')
            user.password = await bcrypt.hash(user.password, 8);
        }else{
            console.log('moved to else block')
        }
     }
    },
  }
);

module.exports = userEntity;
