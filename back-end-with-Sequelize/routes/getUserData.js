const express = require('express')
const router = express.Router()

module.exports = sequelizeModels => {
  router.get('/:employee_id', async (req, res) => {
    console.log('started request')

    Users = sequelizeModels.User
    Columns = sequelizeModels.Column
    Employees = sequelizeModels.Employee
    Milestones = sequelizeModels.Milestone
    Priorities = sequelizeModels.Priority
    Projects = sequelizeModels.Project
    Project_Assignments = sequelizeModels.ProjectAssignment
    Roles = sequelizeModels.Role
    Severity = sequelizeModels.Severity
    Tickets = sequelizeModels.Ticket
    Types = sequelizeModels.Types

    try {
      console.log('getting data')

      const all_project_assignments = await Project_Assignments.findAll({
        where: { employee_id: req.params.employee_id }
      })
      const all_columns = await Column.findAll()
      const all_employees = await Employee.findAll()
      const all_projects = await Projects.findAll()
      const all_tickets = await Tickets.findAll()
      const ticket_severity = await Severity.findAll()
      const ticket_priority = await Priorities.findAll()
      const ticket_type = await Types.findAll()
      const all_milestones = await Milestones.findAll()

      const user_project_assignments = []

      if (all_project_assignments.length === 1) {
        user_project_assignments.push(all_project_assignments[0].dataValues)
      } else if (all_project_assignments.length > 1) {
        all_project_assignments.map(project_assignment => {
          if (
						project_assignment.dataValues.employee_id === req.params.employee_id
					) {
            user_project_assignments.push(project_assignment.dataValues)
          }
        })
      }

      const user_project_ids = []

      all_project_assignments.map(project_assignment => {
        user_project_ids.push(project_assignment.dataValues.project_id)
      })

      const user_projects = []

      for (const project of all_projects) {
        if (user_project_ids.includes(project.dataValues.id)) {
          user_projects.push(project.dataValues)
        }
      }

      const user_project_employee_ids = []

      all_project_assignments.map(project_assignment => {
        if (
					user_project_ids.includes(project_assignment.dataValues.project_id)
				) {
          user_project_employee_ids.push(
						project_assignment.dataValues.employee_id
					)
        }
      })

      const user_employees = []

      for (const employee_id of user_project_employee_ids) {
        for (const employee of all_employees) {
          if (employee.dataValues.id === employee_id) {
            user_employees.push(employee.dataValues)
          }
        }
      }

      const user_columns = []

      for (const project of user_projects) {
        for (const column of all_columns) {
          if (column.project_id === project.id) {
            user_columns.push(column.dataValues)
          }
        }
      }

      const user_tickets = []

      for (const column of user_columns) {
        for (const ticket of all_tickets) {
          if (column.id === ticket.dataValues.column_id) {
            user_tickets.push(ticket.dataValues)
          }
        }
      }

			// MILESTONES NOT IMPLEMENTED YET
			// const user_milestones = []

			// for (const ticket of all_tickets) {
			//   for (const milestone of all_milestones) {
			//     if (ticket.dataValues.milestone_id === milestone.dataValues.id) {
			//       if (!user_milestones.includes(milestone.dataValues)) {
			//         user_milestones.push(milestone.dataValues)
			//       }
			//     }
			//   }
			// }

      const userData = await {
        user_project_assignments,
        user_projects,
        user_columns,
        user_tickets,
        ticket_severity,
        ticket_priority,
        ticket_type
      }

      console.log('returning data')

      return res.json(userData)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  return router
}
