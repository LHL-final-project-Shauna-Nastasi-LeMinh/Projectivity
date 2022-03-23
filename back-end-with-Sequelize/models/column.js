'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Column extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Project, { foreignKey: "project_id", targetKey: "id"})
      this.hasMany(models.Ticket, { foreignKey: "column_id", targetKey: "id"})
    }
  }
  Column.init({
    name: DataTypes.STRING,
    project_id: DataTypes.INTEGER,
    ordering_index: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'columns',
    modelName: 'Column',
  });
  return Column;
};
