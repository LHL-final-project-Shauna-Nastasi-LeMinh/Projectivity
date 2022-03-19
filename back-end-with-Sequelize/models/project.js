'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ProjectAssignment, { foreignKey: "project_id", targetKey: "id"})
      this.belongsToMany(models.Employee, { through: 'ProjectAssignment', foreignKey: "project_id", otherKey: "employee_id" });
      this.hasMany(models.Column, { foreignKey: "project_id", targetKey: "id"})
    }
  }
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'projects',
    modelName: 'Project',
  });
  return Project;
};
