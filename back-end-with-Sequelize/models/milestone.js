'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Milestone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Milestone.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    deadline: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'milestones',
    modelName: 'Milestone',
  });
  return Milestone;
};
