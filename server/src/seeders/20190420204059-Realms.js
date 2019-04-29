'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Realms', [
            {id: 0, title: 'شهرسازی'},
            {id: 1, title: 'درآمد', parentId: 0},
            {id: 2, title: 'نوسازی', parentId: 0},
            {id: 3, title: 'کسب و پیشه', parentId: 0},
            {id: 4, title: 'ضابطه', parentId: 0},
            {id: 5, title: 'تخلف پویا', parentId: 0},
            {id: 6, title: 'کمیسیون ها', parentId: 0},
            {id: 7, title: 'کمیسیون ماده 77', parentId: 6},
            {id: 8, title: 'کمیسیون ماده 100', parentId: 6},
            {id: 9, title: 'کمیسیون ماده 5', parentId: 6},
            {id: 10, title: 'حفاری', parentId: 0},
            {id: 11, title: 'مهندسین ناظر', parentId: 0},
            {id: 100, title: 'آبفا'},
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Realms', null, {});

    }
};
