'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'raeisi@zoho.com',
                password: Sequelize.fn('crypt', '123', "gen_salt('bf', 8)"),
                nickname: 'Morteza',
                createdAt: new Date('at Apr 20 2019 23:46:53 GMT+0430 (+0430)'),
                updatedAt: new Date('at Apr 20 2019 23:46:54 GMT+0430 (+0430)'),
            },
            {
                email: 'mrraeisi@outlook.com',
                password: Sequelize.fn('crypt', '123', "gen_salt('bf', 8)"),
                nickname: 'Admin',
                createdAt: new Date('at Apr 20 2019 23:46:55 GMT+0430 (+0430)'),
                updatedAt: new Date('at Apr 20 2019 23:46:56 GMT+0430 (+0430)'),
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
