'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Assignees', {
            uuid: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.fn('uuid_generate_v4')
            },
            parent: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {model: 'Assignees', key: 'uuid'}
            },
            issueUuid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'Issues', key: 'uuid'}
            },
            userUuid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'Users', key: 'uuid'}
            },
            createdBy: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'Users', key: 'uuid'}
            },
            viewpointId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: 'Viewpoints'}
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
        return queryInterface.dropTable('Assignees');
    }
};