const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Comercio',
    {
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
      role: {
        type: DataTypes.STRING,
        defaultValue: 'comercio',
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: false,
      },
      instagram: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      facebook: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tiktok: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      whatsapp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true, // Puede ser null hasta que se genere un token
      },
      resetPasswordExpires: {
        type: DataTypes.DATE, // Almacena la fecha de expiración del token
        allowNull: true,
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

