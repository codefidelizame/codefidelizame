'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar la columna deletedAt de la tabla Comercios
    await queryInterface.removeColumn('Comercios', 'deletedAt');
  },

  down: async (queryInterface, Sequelize) => {
    // Volver a agregar la columna deletedAt en caso de rollback
    await queryInterface.addColumn('Comercios', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};