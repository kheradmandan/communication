'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Statuses', [
            {id: 0, title: 'پیشنویس'},
            {id: 1, title: 'باز'},
            {id: 2, title: 'اقدام'},
            {id: 3, title: 'بسته'},
            {id: 4, title: 'لغو'},
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Statuses', null, {});
    }
};
