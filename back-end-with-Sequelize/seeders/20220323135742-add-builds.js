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
     await queryInterface.bulkInsert('builds', [
      {
        name: 'v12.22.5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'v12.22.7',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'v15.14.0',
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
     await queryInterface.bulkDelete('builds', null, {});
  }
};
