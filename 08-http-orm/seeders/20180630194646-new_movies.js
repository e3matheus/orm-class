'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('movies', [
      { name: 'Avengers', createdAt: Sequelize.fn('NOW'), updatedAt: Sequelize.fn('NOW')  },
      { name: 'Black Panther', createdAt: Sequelize.fn('NOW'), updatedAt: Sequelize.fn('NOW') }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('movies', null, {});
  }
};
