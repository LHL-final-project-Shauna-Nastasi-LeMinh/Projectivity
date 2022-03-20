const model = require('./models')

async function testRolesAndEmployees () {
  const rawData = await model.Role.findAll({
    where: { name: 'Manager' },
    include: [
      {
        model: model.Employee
      }
    ]
  })

	// get all roles, then first role from array
  const roles = JSON.parse(JSON.stringify(rawData))
  const firstRole = roles[0]
  console.log(firstRole)

	// from the first role, get all Employees
  const employees = firstRole.Employees
  const firstEmployee = employees[0]
  console.log(firstEmployee)
}

async function testEmployeesVsAssignmentsVsProjects () {
	// await sequelize.sync({ force: true})
  const rawData = await model.Employee.findAll({
    where: { first_name: 'John' },
    include: [
      {
        model: model.ProjectAssignment
      },
      {
        model: model.Project
      }
    ]
  })

	// get first employee from array
  const employees = JSON.parse(JSON.stringify(rawData))
  const firstEmployee = employees[0]
  console.log(firstEmployee)

	// get all projects for that employee
  const projects = firstEmployee.Projects
  const firstProject = projects[0]
  console.log(firstProject)

	// get project_assignment for that employee
  const assignment = firstProject.ProjectAssignment
  console.log(assignment)
	// Or can get like this, project assignments available from both Employee and Project model
	// const assignments = firstEmployee.ProjectAssignments;
	// const firstAssignment = assignments[0];
}

async function testProjectsAndColumns () {
  const rawData = await model.Project.findAll({
    where: { id: 1 },
    include: [
      {
        model: model.Column
      }
    ]
  })

	// get all projects, then first project from array
  const projects = JSON.parse(JSON.stringify(rawData))
  const firstProject = projects[0]
  console.log(firstProject)

	// from the first project, get all Columns
  const columns = firstProject.Columns
  const firstColumn = columns[0]
  console.log(firstColumn)
}

async function testColumnsAndTickets () {
  const rawData = await model.Column.findAll({
    where: { id: 1 },
    include: [
      {
        model: model.Ticket
      }
    ]
  })

	// get all projects, then first project from array
  const columns = JSON.parse(JSON.stringify(rawData))
  const firstColumn = columns[0]
  console.log(firstColumn)

	// from the first project, get all Columns
  const tickets = firstColumn.Tickets
  const firstTicket = tickets[0]
  console.log(firstTicket)
}

testRolesAndEmployees()
testEmployeesVsAssignmentsVsProjects()
testProjectsAndColumns()
testColumnsAndTickets()
