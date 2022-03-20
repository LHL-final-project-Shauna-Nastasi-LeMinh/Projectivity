'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ProjectAssignment extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
			// define association here
      this.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        targetKey: 'id'
      })
      this.belongsTo(models.Project, {
        foreignKey: 'project_id',
        targetKey: 'id'
      })
			// this.belongsTo(models.Columns, {
			//   foreignKey: 'project_id',
			//   targetKey: 'project_id'
			// })
    }
	}
  ProjectAssignment.init(
    {
      employee_id: DataTypes.INTEGER,
      project_id: DataTypes.INTEGER,
      assignment_date: DataTypes.DATE
    },
    {
      sequelize,
      tableName: 'project_assignments',
      modelName: 'ProjectAssignment'
    }
	)
  return ProjectAssignment
}
