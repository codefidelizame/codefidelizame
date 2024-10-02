const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Service',
    {
      serviceName: {
        type: DataTypes.STRING,
        allowNull: false,
      },


      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      
      },
      bonificado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false

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