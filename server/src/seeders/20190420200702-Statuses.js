'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Statuses', [
            {id: 0, title: 'draft'},
            {id: 1, title: 'active'},
            {id: 2, title: 'in-progress'},
            {id: 3, title: 'closed'},
            {id: 4, title: 'rejected'},
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Statuses', null, {});
    }
};
