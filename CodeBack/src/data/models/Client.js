const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Client',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },   
      email: {
        type: DataTypes.STRING,
        allowNull: false,
       
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      totalServices:{
        type: DataTypes.INTEGER,
        defaultValue:0
      },
     
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      paranoid: true,
    }
  );
};
