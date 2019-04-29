'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Origins', [
            {id: 0, title: 'نامشخص'},
            {id: 1, title: 'تهران'},
            {id: 2, title: 'اندیشه', parentId: 1},
            {id: 3, title: 'ملارد', parentId: 1},
            {id: 4, title: 'شهریار', parentId: 1},
            {id: 5, title: 'قزوین '},
            {id: 6, title: 'قزوین', parentId: 5},
            {id: 7, title: 'تاکستان', parentId: 5},
            {id: 8, title: 'اقبالیه', parentId: 5},
            {id: 9, title: 'شریفیه', parentId: 5},
            {id: 10, title: 'زیباشهر', parentId: 5},
            {id: 11, title: 'شال', parentId: 5},
            {id: 12, title: 'اسفرورین', parentId: 5},
            {id: 13, title: 'چهارمحال و بختیاری'},
            {id: 14, title: 'شهرکرد', parentId: 13},
            {id: 15, title: 'بروجن', parentId: 13},
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Origins', null, {});
    }
};
