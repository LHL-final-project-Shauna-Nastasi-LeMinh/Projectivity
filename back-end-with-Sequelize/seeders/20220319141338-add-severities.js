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
     await queryInterface.bulkInsert('severities', [
      {
        name: 'Low',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Minor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Major',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Critical',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Catastrophic',
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
     await queryInterface.bulkDelete('severities', null, {});
  }
};
