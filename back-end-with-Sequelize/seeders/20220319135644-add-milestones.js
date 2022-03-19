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
     await queryInterface.bulkInsert('milestones', [
      {
        name: 'Customer Proposal',
        description: 'Target for finalizing product sale',
        deadline: new Date('March 20, 2022 24:00:00'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Official Testing',
        description: 'Target to complete major development',
        deadline: new Date('April 31, 2022 24:00:00'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'First release',
        description: 'First official release version',
        deadline: new Date('May 31, 2022 24:00:00'),
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
     await queryInterface.bulkDelete('milestones', null, {});
  }
};
