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
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
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
