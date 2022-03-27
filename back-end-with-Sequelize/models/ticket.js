'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Column, { foreignKey: "column_id", targetKey: "id"})
      this.hasMany(models.History, { foreignKey: "ticket_id", targetKey: "id"})
    }
  }
  Ticket.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    deadline: DataTypes.DATE,
    completed_at: DataTypes.DATE,
    severity: DataTypes.STRING,
    priority: DataTypes.STRING,
    type: DataTypes.STRING,
    build: DataTypes.STRING,
    milestone: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    column_id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'tickets',
    modelName: 'Ticket',
  });
  return Ticket;
};
