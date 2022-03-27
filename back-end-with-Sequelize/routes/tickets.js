const express = require('express')
const column = require('../models/column')
const users = require('./users')
const router = express.Router()
const addHistoryEvent = require('./helper/historyHelper')

module.exports = sequelizeModels => {
  projectTickets = sequelizeModels.ProjectAssignment
  Ticket = sequelizeModels.Ticket

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
      const {
        title,
        description,
        created_by,
        column_id,
        severity,
        priority,
        type,
        milestone,
        creator_name,
      } = req.body

      const newTicket = await Tickets.create({
        title,
        description,
        created_by,
        column_id,
        severity,
        priority,
        type,
        milestone
      })

      addHistoryEvent(newTicket.id, "CREATED", null, null, creator_name)

      return res.json(newTicket);
    } catch (err) {
      console.log(err, "foo")
      return res.status(500).json(err)
    }
  })

  router.delete('/:ticket_id', async (req, res) => {
    try {
      const ticket_id = req.params.ticket_id
      Tickets.destroy({
        where: {
          id: ticket_id
        }
      })

      return res.json('success!')
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  router.post('/:ticket_id', async (req, res) => {
    try {
      const {id, title, description, severity, priority, type, milestone, updater_name} = req.body

      // get original ticket data before update, for history purpose
      const oldTicketDataRaw = await Ticket.findAll(
        { where: { id: id } }
      )
      const oldTicketData = JSON.parse(JSON.stringify(oldTicketDataRaw))[0];

      // actual update
      await Tickets.update(
        {title, description, severity, priority, type, milestone},
        {
        where: {
          id: id
        }
      })

      if (title !== undefined && oldTicketData.title !== title) {
        await addHistoryEvent(id, "TITLE CHANGE", oldTicketData.title, title, updater_name)
      }
      if (severity !== undefined && oldTicketData.severity !== severity) {
        await addHistoryEvent(id, "SEVERITY CHANGE", oldTicketData.severity, severity, updater_name)
      }
      if (priority !== undefined && oldTicketData.priority !== priority) {
        await addHistoryEvent(id, "PRIORITY CHANGE", oldTicketData.priority, priority, updater_name)
      }
      if (type !== undefined && oldTicketData.type !== type) {
        await addHistoryEvent(id, "TYPE CHANGE", oldTicketData.type, type, updater_name)
      }
      if (milestone !== undefined && oldTicketData.milestone !== milestone) {
        await addHistoryEvent(id, "MILESTONE CHANGE", oldTicketData.milestone, milestone, updater_name)
      }

      const updatedTicket = await Tickets.findAll({
        where: { id: id } })

      return res.json(updatedTicket)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  router.put('/:ticket_id/updateColumn', async (req, res) => {
    try {
      const {ticketId, newColumnId, updater_name} = req.body
      // just to get old column name for history purpose
      const oldTicket = await Ticket.findAll(
        { where: { id: ticketId } }
      )
      const oldColumnId = JSON.parse(JSON.stringify(oldTicket))[0].column_id

      const oldColumn = await Columns.findAll(
        { where: { id: oldColumnId } }
      )
      const oldColumnName = JSON.parse(JSON.stringify(oldColumn))[0].name

      // Actual update
      await Ticket.update(
        { column_id: newColumnId },
        { where: { id: ticketId } }
      )

      // get new column name for history purpose
      const newColumn = await Columns.findAll(
        { where: { id: newColumnId } }
      )
      const newColumnName = JSON.parse(JSON.stringify(newColumn))[0].name

      addHistoryEvent(ticketId, "STATUS CHANGE", oldColumnName, newColumnName, updater_name)
      return res.json({ message: "Column updated for ticket" });
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })
  return router
}
