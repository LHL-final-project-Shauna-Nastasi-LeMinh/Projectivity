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
        first_name: 'John',
        last_name: 'Man',
        email: 'john@gmail.com',
        password: 'password',
        phone: '9021111111',
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Jane',
        last_name: 'De',
        email: 'jane@gmail.com',
        password: 'password',
        phone: '9021111111',
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Alice',
        last_name: 'Te',
        email: 'alice@gmail.com',
        password: 'password',
        phone: '9021111111',
        role_id: 3,
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
