const express = require('express')
const users = require('./users')
const router = express.Router()

module.exports = sequelizeModels => {
  Project_Assignments = sequelizeModels.ProjectAssignment
  Columns = sequelizeModels.Column
  Projects = sequelizeModels.Project
  Tickets = sequelizeModels.Ticket

  router.get('/:employee_id', async (req, res) => {
    try {
      const project_assignments = await Project_Assignments.findAll({
        where: { employee_id: req.params.employee_id },
        include: [
          {
            model: sequelizeModels.Project
          }
        ],
        order: [['id', 'ASC']]
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
        order: [['ordering_index', 'ASC']]
      })
      return res.json(columns)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  router.post('/new', async (req, res) => {
    try {
      const { name, description, employee_id } = req.body
      const project = await Projects.create({
        name,
        description
      })

      const project_id = project.dataValues.id
      const assignment_date = Date.now()

      const project_assignment = await Project_Assignments.create({
        employee_id,
        project_id,
        assignment_date
      })

      await Columns.create({
        name: 'Open',
        project_id
      })
      await Columns.create({
        name: 'In Progress',
        project_id
      })
      await Columns.create({
        name: 'Closed',
        project_id
      })

      return res.json('success!')
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  router.delete('/:project_id/delete', async (req, res) => {
    try {
      const project_id = req.params.project_id
      Projects.destroy({
        where: {
          id: project_id
        }
      })

      Project_Assignments.destroy({
        where: {
          project_id: project_id
        }
      })

      const columns_data = await Columns.findAll({
        where: {
          project_id: project_id
        }
      })

      const column_ids = columns_data.map(column => column.dataValues.id)

      console.log(column_ids)

      for (const column of column_ids) {
        console.log(column)
        Tickets.destroy({
          where: {
            column_id: column
          }
        })
      }

      Columns.destroy({
        where: {
          project_id: project_id
        }
      })

      return res.json('success!')
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  return router
}
