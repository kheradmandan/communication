'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Comments', {
            uuid: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.fn('uuid_generate_v4'),
            },
            issueUuid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'Issues', key: 'uuid'}
            },
            createdBy: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'Users', key: 'uuid'},
            },
            deletedBy: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {model: 'Users', key: 'uuid'},
            },
            context: {
                type: Sequelize.TEXT,
                allowNull: false,
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
        return queryInterface.dropTable('Comments');
    }
}
;