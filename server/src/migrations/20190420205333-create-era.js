'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Eras', {
            uuid: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.fn('uuid_generate_v4'),
            },
            originId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: 'era_IX_originId_and_title',
                references: {model: 'Origins'}
            },
            title: {
                type: Sequelize.STRING(64),
                allowNull: false,
                unique: 'era_IX_originId_and_title',
            },
            sequence: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                unique: 'era_IX_originId_and_title',
            },
            initialize: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            increment: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            beginAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            finishAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            continues: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
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
        return queryInterface.dropTable('Eras');
    }
};