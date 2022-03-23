const express = require('express')
const router = express.Router()

module.exports = sequelizeModels => {
  router.get('/:employee_id', async (req, res) => {
    try {
      Users = sequelizeModels.User
      Columns = sequelizeModels.Column
      Employees = sequelizeModels.Employee
      Milestones = sequelizeModels.Milestone
      Priorities = sequelizeModels.Priority
      Projects = sequelizeModels.Project
      Project_Assignments = sequelizeModels.Project_Assignments
      Roles = sequelizeModels.Roles
      Severity = sequelizeModels.Severity
      Tickets = sequelizeModels.Ticket
      Types = sequelizeModels.Types

      const all_project_assignments = Project_Assignments.findAll({
        where: { employee_id: req.params.employee_id }
      })

      const user_project_assignments = all_project_assignments.filter(
				project => project.employee_id === req.params.employee_id
			)

      const user_projects = []
      const user_project_employees = []
      const user_columns = []
      const user_tickets = []
      const ticket_severity = Severities.findAll()
      const ticket_priority = Priorities.findAll()
      const ticket_type = Type.findAll()
      const ticket_build = Build.findAll()
      const user_milestones = []

      user_project_assignments.array.forEach(project_assignment => {
        user_projects.push(
					Projects.findAll({
  where: { id: project_assignment.project_id }
})
				)
        user_project_employees.push(
					Employee.findAll({
  where: { id: project.id && project_id }
})
				)
      })

      user_projects.map(project => {
        user_columns.push(
					Columns.findAll({
  where: { project_id: project.id }
})
				)
      })

      user_columns.map(column => {
        user_tickets.push(
					Tickets.findAll({
  where: { column_id: column.id }
})
				)
      })

      user_tickets.map(ticket => {
        user_milestones.push(
					Milestone.findAll({
  where: { id: ticket.milestone_id }
})
				)
      })

      const userData = {
        user_project_assignments,
        user_projects,
        user_columns,
        user_tickets,
        user_milestones,
        ticket_severity,
        ticket_priority,
        ticket_type,
        ticket_build
      }

      return userData
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  return router
}
