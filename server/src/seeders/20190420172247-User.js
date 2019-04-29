'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                uuid: 'ce0d1090-396f-4d2b-9f51-ee6ef2051a3f',
                email: 'raeisi@zoho.com',
                password: Sequelize.fn('crypt', '123', "gen_salt('bf', 8)"),
                fullName: 'مرتضی رییسی',
                createdAt: new Date('at Apr 20 2019 23:46:53 GMT+0430 (+0430)'),
                updatedAt: new Date('at Apr 20 2019 23:46:54 GMT+0430 (+0430)'),
            },
            {
                uuid: '95b36189-d2d4-480d-9881-0eadc96f617f',
                email: 'd.mohammadi.a@gmail.com',
                password: Sequelize.fn('crypt', '123', "gen_salt('bf', 8)"),
                fullName: 'داود محمدی',
                createdAt: new Date('at Apr 20 2019 23:46:55 GMT+0430 (+0430)'),
                updatedAt: new Date('at Apr 20 2019 23:46:56 GMT+0430 (+0430)'),
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
