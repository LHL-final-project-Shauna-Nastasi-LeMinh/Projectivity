'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    // Add seed commands here.

    await queryInterface.bulkInsert('users', [
      {
        firstname: 'John',
        lastname: 'Doe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Jane',
        lastname: 'Doe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Alice',
        lastname: 'Doe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
