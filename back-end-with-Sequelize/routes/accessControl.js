const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels) => {

  Employee = sequelizeModels.Employee;
  Role = sequelizeModels.Role;

  router.post('/login', async(req, res) => {
    try {
      const {email, password} = req.body;
      const rawData = await Employee.findAll({
        where: {
          email: email,
          password: password
        }, include: [{
          model: Role,
        }]
      })

      const employees = JSON.parse(JSON.stringify(rawData))

      if (employees.length > 0) {
        req.session["employee_id"] = employees[0].id;
        req.session["role_id"] = employees[0].Role.id;
        return res.json( employees[0] );
      } else {
        return res.status(403).json(new Error("Access forbidden"));
      }
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  router.post('/register', async(req, res) => {
    try {
      const {first_name, last_name, phone, email, password, role_id} = req.body;
      const employee = await Employee.create({first_name, last_name, phone, email, password, role_id})
      console.log(employee);
      req.session["employee_id"] = employee.id;
      req.session["role_id"] = role_id;
      return res.json(employee);
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  router.get('/logout', async(req, res) => {
    try {
      req.session["employee_id"] = null;
      req.session["role_id"] = null;
      return res.json({ message: "Logged out" });
    } catch(err) {
    }
  })

  return router;
};
