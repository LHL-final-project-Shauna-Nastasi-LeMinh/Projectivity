'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Ticket, { foreignKey: "ticket_id", targetKey: "id"})
    }
  }
  History.init({
    ticket_id: DataTypes.STRING,
    event: DataTypes.STRING,
    source_value: DataTypes.STRING,
    dest_value: DataTypes.STRING,
    updater: DataTypes.STRING
  }, {
    sequelize,
    tableName:'histories',
    modelName: 'History',
  });
  return History;
};
