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
     await queryInterface.bulkInsert('notifications', [
      {
        user_id: 2,
        message: 'You have been added to the system',
        unread: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        message: 'You have been added to the system',
        unread: true,
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
     await queryInterface.bulkDelete('notifications', null, {});
  }
};
