'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Attachments', {
            uuid: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.fn('uuid_generate_v4'),
            },
            issueUuid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'Issues', key: 'uuid'},
            },
            createdBy: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'Users', key: 'uuid'},
            },
            deletedBy: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'Users', key: 'uuid'},
            },
            title: {
                type: Sequelize.STRING(128),
                allowNull: true,
            },
            path: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Attachments');
    }
};