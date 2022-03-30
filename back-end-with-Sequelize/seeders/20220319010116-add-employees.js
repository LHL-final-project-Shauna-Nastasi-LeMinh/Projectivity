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
        last_name: 'Doe',
        email: 'managerA@gmail.com',
        password: 'password',
        phone: '9021111111',
        avatar: 'https://scontent.fyto3-1.fna.fbcdn.net/v/t1.18169-9/18221808_801431010025921_4506344566697017791_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=klVjt5RZM38AX-ST7bx&_nc_ht=scontent.fyto3-1.fna&oh=00_AT9HhJZbeFRQ7hHkzmZb3USWdbt5cilJEbEM2RECwoCzwA&oe=62652E00',
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
        avatar: 'https://ca.slack-edge.com/T2G8TE2E5-U02SX82DQR4-fed59f9b552e-512',
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
        avatar: 'https://scontent.fyto3-1.fna.fbcdn.net/v/t1.18169-9/15589741_10154431287060910_4787046566827201754_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=lvTj4y5ipYsAX--MpYI&tn=ZiupIEAeF73QBU42&_nc_ht=scontent.fyto3-1.fna&oh=00_AT8r_zbtqiAfqiI6cj5s2HiwAkPs7VSNoM-DdDXFk2VABQ&oe=62662976',
        role_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'HR@gmail.com',
        password: 'password',
        phone: '9021111111',
        avatar: '',
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Jenifer',
        last_name: 'Doe',
        email: 'dev2@gmail.com',
        password: 'password',
        phone: '9021111111',
        avatar: '',
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
