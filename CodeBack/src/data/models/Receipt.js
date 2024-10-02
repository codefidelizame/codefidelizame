const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Receipt',
    {
        receiptNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },


      serviceDate: {
        type: DataTypes.DATE,
        allowNull: false,
      
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