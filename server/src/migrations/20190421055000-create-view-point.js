'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Viewpoints', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(64)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Viewpoints');
  }
};