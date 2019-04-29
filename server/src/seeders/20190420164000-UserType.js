'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('UserTypes', [
            {id: 0, title: 'کاربر'},
            {id: 10, title: 'محاسبات'},
            {id: 11, title: 'پشتیبان'},
            {id: 12, title: 'راهبر'},
            {id: 20, title: 'مدیر پروژه'},
            {id: 21, title: 'ریاست'},
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('UserTypes', null, {});

    }
};
