'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Eras', [
            {
                uuid: '26608d95-6ace-4a0d-8df3-4923fc6329bf',
                originId: 13,
                title: 'سال 1398',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Eras', null, {});
    }
};
