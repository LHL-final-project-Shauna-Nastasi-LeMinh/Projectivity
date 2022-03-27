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
        severity: 'Major',
        priority: 'Urgent',
        type: 'Usability',
        build: 'v12.22.5',
        owner_id: 2,
        milestone: 'Customer Proposal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'User registration missing last name info',
        description: 'I cannot find the info in registration page. Can be an issue with either UI or DB',
        column_id: 2,
        severity: 'Major',
        priority: 'Valuable',
        type: 'Functional',
        build: 'v17.5.0',
        owner_id: 2,
        milestone: 'Customer Proposal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'React not working',
        description: 'Look like we have a compatibility with latest React release upgrade',
        column_id: 3,
        severity: 'Critical',
        priority: 'Discretionary',
        type: 'Compatibility',
        build: 'v12.22.5',
        owner_id: 2,
        milestone: 'Customer Proposal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Server halting',
        description: 'Server halting when click on new course button',
        column_id: 1,
        severity: 'Critical',
        priority: 'Urgent',
        type: 'Usability',
        build: 'v17.5.0',
        owner_id: 2,
        milestone: 'Customer Proposal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Typo error in registration',
        description: 'First name is shown as flirt name. Have to be fixed by coming demo day',
        column_id: 2,
        severity: 'Low',
        priority: 'Urgent',
        type: 'Functional',
        build: 'v17.5.0',
        owner_id: 3,
        milestone: 'Customer Proposal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'About us type',
        description: 'Company name is wrongly display. Have to be fixed by coming demo day',
        column_id: 3,
        severity: 'Low',
        priority: 'Urgent',
        type: 'Functional',
        build: 'v12.22.5',
        owner_id: 3,
        milestone: 'Customer Proposal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Logout button not working',
        description: 'Logout button is not clickable',
        column_id: 6,
        severity: 'Minor',
        priority: 'Discretionary',
        type: 'Usability',
        build: 'v17.5.0',
        owner_id: 2,
        milestone: 'Official E2E Testing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Database wiped out',
        description: 'Someone wiped out testing database',
        column_id: 7,
        severity: 'Catastrophic',
        priority: 'Urgent',
        type: 'Usability',
        build: 'v17.5.0',
        owner_id: 2,
        milestone: 'Official E2E Testing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cookie not storing value',
        description: 'Cannot find UserId in cookie session',
        column_id: 8,
        severity: 'Major',
        priority: 'Urgent',
        type: 'Security',
        build: 'v17.5.0',
        owner_id: 3,
        milestone: 'Official E2E Testing',
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
