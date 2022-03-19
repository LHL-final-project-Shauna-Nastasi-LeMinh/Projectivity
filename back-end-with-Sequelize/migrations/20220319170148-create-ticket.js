'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.DATE
      },
      completed_at: {
        type: Sequelize.DATE
      },
      severity_id: {
        type: Sequelize.INTEGER
      },
      priority_id: {
        type: Sequelize.INTEGER
      },
      type_id: {
        type: Sequelize.INTEGER
      },
      build_id: {
        type: Sequelize.INTEGER
      },
      milestone_id: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      column_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      owner_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tickets');
  }
};
