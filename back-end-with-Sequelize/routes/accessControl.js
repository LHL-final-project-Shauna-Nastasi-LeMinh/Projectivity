const express = require('express')
const router = express.Router()

module.exports = sequelizeModels => {
  Employee = sequelizeModels.Employee
  Role = sequelizeModels.Role

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body
      const rawData = await Employee.findAll({
        where: {
          email: email,
          password: password
        },
        include: [
          {
            model: Role
          }
        ]
      })

      const employees = JSON.parse(JSON.stringify(rawData))

      if (employees.length > 0) {
        const employee = employees[0]

        return res.json({
          id: employee.id,
          email: employee.email,
          role_id: employee.Role.id
        })
      } else {
        return res.status(403).json(new Error('Access forbidden'))
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  router.post('/register', async (req, res) => {
    try {
      const newEmployee = ({
				first_name,
				last_name,
				phone,
				email,
				password,
				role_id
			} = req.body)
      const employee = await Employee.create(newEmployee)

      console.log('employee', employee, newEmployee)

			// return newEmployee
      return res.json(newEmployee)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  router.get('/logout', async (req, res) => {
    try {
      return res.json({ message: 'Logged out' })
    } catch (err) {}
  })

  return router
}
