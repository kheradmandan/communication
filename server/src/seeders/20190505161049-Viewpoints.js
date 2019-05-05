'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Viewpoints', [
            {
                id: 0,
                title: 'همگانی'
            },
            {
                id: 1,
                title: 'پشتیبان'
            },
            {
                id: 2,
                title: 'مدیریت'
            }
        ], {});

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Viewpoints', null, {});

    }
};
