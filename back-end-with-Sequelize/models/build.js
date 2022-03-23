'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Build extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Build.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'builds',
    modelName: 'Build',
  });
  return Build;
};
