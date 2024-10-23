const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Subscription', {
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    
  }, {
    timestamps: true, 
  });
};