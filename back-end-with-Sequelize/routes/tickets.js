const express = require('express')
const column = require('../models/column')
const users = require('./users')
const router = express.Router()

module.exports = sequelizeModels => {
  projectTickets = sequelizeModels.ProjectAssignment
  Tickets = sequelizeModels.Ticket

  router.get('/:employee_id', async (req, res) => {
    try {
      const project_assignments = await Project_Assignments.findAll({
        where: { employee_id: req.params.employee_id }, // selectedProject
        include: [
          {
            model: sequelizeModels.Project
          }
        ]
      })

      const columns = await column.findAll({
        where: { project_id: project_assignments[0].project_id },
        include: [
          {
            model: sequelizeModels.Ticket
          }
        ]
      })

      return res.json(columns)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  router.post('/new', async (req, res) => {
    try {
      const {description, created_by, column_id} = req.body

      const ticket = await Tickets.create({
        title: 'test',
        description,
        created_by,
        column_id,
      })

      return res.json('success!')
    } catch (err) {
      console.log(err, "foo")
      return res.status(500).json(err)
    }
  })

  router.post('/updateColumn', async (req, res) => {
    try {
      const {ticketId, newColumnId} = req.body
      console.log(ticketId, newColumnId)
      // await Tickets.create({

      // })

      return res.json({ message: "Column updated for ticket" });
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })
  return router
}
