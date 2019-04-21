'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Issues', {
            uuid: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.fn('uuid_generate_v4'),
            },
            intentionTo: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {model: 'Users', key: 'uuid'}
            },
            createdBy: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'Users', key: 'uuid'}
            },
            deletedBy: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {model: 'Users', key: 'uuid'}
            },
            priorityId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: 'Priorities'}
            },
            realmId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: 'Realms'}
            },
            statusId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: 'Statuses'}
            },
            eraUuid: {
                type: Sequelize.UUID,
                allowNull: false,
                unique: 'issue_IX_eraUuid_and_sequence',
                references: {model: 'Eras', key: 'uuid'}
            },
            sequence: {
                type: Sequelize.STRING(64),
                allowNull: false,
                unique: 'issue_IX_eraUuid_and_sequence',
            },
            title: {
                type: Sequelize.STRING(512),
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
        return queryInterface.dropTable('Issues');
    }
};