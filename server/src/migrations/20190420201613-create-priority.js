'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Priorities', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                type: Sequelize.STRING(16),
                allowNull: false,
                unique: true
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Priorities');
    }
};