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
     await queryInterface.bulkInsert('columns', [
      {
        name: 'Open',
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'In Progress',
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'To Be Tested',
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Closed',
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Open',
        project_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'In Progress',
        project_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'To Be Tested',
        project_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Closed',
        project_id: 2,
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
     await queryInterface.bulkDelete('columns', null, {});
  }
};
