const express = require('express')
const users = require('./users')
const router = express.Router()

module.exports = sequelizeModels => {
  Project_Assignments = sequelizeModels.ProjectAssignment
  Columns = sequelizeModels.Column

  router.get('/:employee_id', async (req, res) => {
    try {
      const project_assignments = await Project_Assignments.findAll({
        where: { employee_id: req.params.employee_id },
        include: [
          {
            model: sequelizeModels.Project
          }
        ],
        order: [
          ['id', 'ASC'],
        ],
      })
      return res.json(project_assignments)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  router.get('/:project_id/columns/', async (req, res) => {
    try {
      const columns = await Columns.findAll({
        where: { project_id: req.params.project_id },
        include: [
          {
            model: sequelizeModels.Ticket
          }
        ],
        order: [
          ['id', 'ASC'],
        ],
      })
      return res.json(columns)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  return router
}
