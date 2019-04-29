'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('IssueStateHistories', {
            uuid: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.fn('uuid_generate_v4')
            },
            parent: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {model: 'IssueStateHistories', key: 'uuid'}
            },
            issueUuid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'Issues', key: 'uuid'}
            },
            createdBy: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'Users', key: 'uuid'}
            },
            source: {
                type: Sequelize.STRING,
                length: 32,
                allowNull: false,
            },
            value: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('IssueStateHistories');
    }
};