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
    }
  }
  Ticket.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    deadline: DataTypes.DATE,
    completed_at: DataTypes.DATE,
    severity_id: DataTypes.INTEGER,
    priority_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    build_id: DataTypes.INTEGER,
    milestone_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    column_id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'tickets',
    modelName: 'Ticket',
  });
  return Ticket;
};
