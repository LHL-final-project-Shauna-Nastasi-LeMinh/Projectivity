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
     await queryInterface.bulkInsert('employees', [
      {
        first_name: 'Jane',
        last_name: 'De',
        email: 'managerA@gmail.com',
        password: 'password',
        phone: '9021111111',
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Alice',
        last_name: 'Doe',
        email: 'devA@gmail.com',
        password: 'password',
        phone: '9021111111',
        avatar: '',
        role_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Brian',
        last_name: 'Doe',
        email: 'testerA@gmail.com',
        password: 'password',
        phone: '9021111111',
        avatar: '',
        role_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'John',
        last_name: 'Man',
        email: 'HR@gmail.com',
        password: 'password',
        phone: '9021111111',
        avatar: '',
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Nastasi',
        last_name: 'Davydov',
        email: 'ge@gmail.com',
        password: 'password',
        phone: '666666666',
        avatar: 'https://ca.slack-edge.com/T2G8TE2E5-U02SX82DQR4-fed59f9b552e-512',
        role_id: 2,
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
     await queryInterface.bulkDelete('employees', null, {});
  }
};
