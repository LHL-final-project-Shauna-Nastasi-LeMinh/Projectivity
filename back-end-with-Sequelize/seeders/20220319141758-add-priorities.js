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
     await queryInterface.bulkInsert('priorities', [
      {
        name: 'Discretionary',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Desirable',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Valuable',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Essential',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Urgent',
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
    await queryInterface.bulkDelete('priorities', null, {});
  }
};
