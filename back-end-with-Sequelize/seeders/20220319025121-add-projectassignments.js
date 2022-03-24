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
     await queryInterface.bulkInsert('project_assignments', [
      {
        employee_id: 1,
        project_id: 1,
        assignment_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_id: 1,
        project_id: 2,
        assignment_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_id: 1,
        project_id: 3,
        assignment_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_id: 2,
        project_id: 1,
        assignment_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_id: 2,
        project_id: 2,
        assignment_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_id: 3,
        project_id: 1,
        assignment_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_id: 3,
        project_id: 2,
        assignment_date: new Date(),
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
     await queryInterface.bulkDelete('project_assignments', null, {});
  }
};
