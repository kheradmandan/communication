'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Origins', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            parentId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {model: 'Origins'}
            },
            title: {
                type: Sequelize.STRING(64),
                allowNull: false,
                unique: true
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Origins');
    }
};