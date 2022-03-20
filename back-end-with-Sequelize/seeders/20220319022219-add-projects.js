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
     await queryInterface.bulkInsert('projects', [
      {
        name: 'PasswordKeepR',
        description: 'Password Manager project for US Department of Defense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jungle Rail',
        description: 'Ruby on Rails proof of concept',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SprintWin',
        description: 'Application to manage scrum process for RBC',
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
     await queryInterface.bulkDelete('projects', null, {});
  }
};
