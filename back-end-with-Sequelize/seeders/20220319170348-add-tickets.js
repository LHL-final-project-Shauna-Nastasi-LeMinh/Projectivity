'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('tickets', [
      {
        title: 'Login button break',
        description: 'Login button is not clickable',
        column_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'User registration missing last name info',
        description: 'I cannot find the info in registration page. Can be an issue with either UI or DB',
        column_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'React not working',
        description: 'Look like we have a compatibility with latest React release upgrade',
        column_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Logout button not working',
        description: 'Logout button is not clickable',
        column_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Database wiped out',
        description: 'Someone wiped out testing database',
        column_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cookie not storing value',
        description: 'Cannot find UserId in cookie session',
        column_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('tickets', null, {});
  }
};
