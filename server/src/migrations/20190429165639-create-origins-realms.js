'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('OriginsRealms', {
            originId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {model: 'Origins', key: 'id'}
            },
            realmId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {model: 'Realms', key: 'id'}
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('OriginsRealms');
    }
};