'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Priorities', [
            {id: 0, title: 'optional'},
            {id: 1, title: 'normal'},
            {id: 2, title: 'important'},
            {id: 3, title: 'critical'},
            {id: 4, title: 'panic'},
        ], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Priorities', null, {});
    }
};
