'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('xref_UsersOrigins', {

            userUuid: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                references: {model: 'Users', key: 'uuid'}
            },
            originId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {model: 'Origins', key: 'id'}
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('xref_UsersOrigins');
    }
};