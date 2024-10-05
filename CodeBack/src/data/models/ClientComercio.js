const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'ClientComercio', // Esta tabla intermedia lleva el control de clientes y comercios
    {
      totalServices: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false, // Lleva el control de la cantidad de servicios comprados por un cliente en un comercio
      },
    },
    {
      paranoid: true, // Para soft delete si lo deseas en la relación
    }
  );
};
