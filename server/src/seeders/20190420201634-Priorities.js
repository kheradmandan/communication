'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Priorities', [
            {id: 0, title: 'پیشفرض'},
            {id: 10, title: 'عادی'},
            {id: 20, title: 'مهم'},
            {id: 30, title: 'بحرانی'},
            {id: 40, title: 'از دست رفته'},
        ], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Priorities', null, {});
    }
};
