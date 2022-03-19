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
     await queryInterface.bulkInsert('types', [
      {
        name: 'Functional',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Performance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Usability',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Compatibility',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Security',
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
     await queryInterface.bulkDelete('types', null, {});
  }
};
