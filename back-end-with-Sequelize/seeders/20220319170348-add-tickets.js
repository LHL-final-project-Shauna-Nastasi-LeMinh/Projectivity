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
        column_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'React not working',
        description: 'Look like we have a compatibility with latest React release upgrade',
        column_id: 1,
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
