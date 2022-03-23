const express = require('express')
const router = express.Router()

module.exports = sequelizeModels => {
  router.get('/', async (req, res) => {
    try {
      Employees = sequelizeModels.Employee
      Roles = sequelizeModels.Role

      const roles = await Roles.findAll()
      const users = await Employees.findAll()

      const genericData = {
        roles,
        users
      }

      return res.json(genericData)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  return router
}
