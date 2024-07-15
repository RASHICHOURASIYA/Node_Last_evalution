const { DataTypes } = require('sequelize');
const sequelize = require('../configs/mysql.db.js');

const Customer = sequelize.define('Customer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role :  {
    type:DataTypes.STRING,
     enum: ["user", "admin"], 
     default:"user", allowNull: false
    },
}, { timestamps: false });

module.exports = Customer;
