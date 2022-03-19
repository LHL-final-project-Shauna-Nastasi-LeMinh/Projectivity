const model = require('./models');

async function testRolesAndEmployees() {
  const rawData = await  model.Role.findAll({
    where: {name: "Manager"},
    include: [{
      model: model.Employee
    }]
  })

  // get all roles, then first role from array
  const roles = JSON.parse(JSON.stringify(rawData))
  const firstRole = roles[0];
  console.log(firstRole);

  // from the first role, get all Employees
  const employees = firstRole.Employees;
  const firstEmployee = employees[0];
  console.log(firstEmployee);
}

async function testEmployeesVsAssignmentsVsProjects() {
  // await sequelize.sync({ force: true})
  const rawData = await  model.Employee.findAll(
  { where: {first_name: "John"},
    include: [{
      model: model.ProjectAssignment
    }, {
      model: model.Project
    }]
  })

  // get first employee from array
  const employees = JSON.parse(JSON.stringify(rawData))
  const firstEmployee = employees[0];
  console.log(firstEmployee);

  // get all projects for that employee
  const projects = firstEmployee.Projects;
  const firstProject = projects[0];
  console.log(firstProject);

   // get project_assignment for that employee
   const assignment = firstProject.ProjectAssignment;
   console.log(assignment);
   //Or can get like this, project assignments available from both Employee and Project model
   //const assignments = firstEmployee.ProjectAssignments;
   //const firstAssignment = assignments[0];
}

testRolesAndEmployees();
testEmployeesVsAssignmentsVsProjects();
