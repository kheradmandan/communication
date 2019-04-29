'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'),
            queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";'),
            queryInterface.createTable('Users', {
                uuid: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                    defaultValue: Sequelize.fn('uuid_generate_v4'),
                },
                userTypeId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {model: 'UserTypes', key: 'id'}
                },
                email: {
                    type: Sequelize.STRING(355),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                fullName: {
                    type: Sequelize.STRING(64),
                    allowNull: false,
                    unique: true,
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
            })
        ].reduce((task, next) => task.then(next), Promise.resolve());
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};