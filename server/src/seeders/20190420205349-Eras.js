'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Eras', [
            {
                originId: 13,
                title: '1398 Contract',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Eras', null, {});
    }
};
