const express = require('express')
const users = require('./users')
const router = express.Router()

module.exports = sequelizeModels => {
  Project_Assignments = sequelizeModels.ProjectAssignment

  router.get('/:employee_id', async (req, res) => {
    try {
      console.log('test')
      const project_assignments = await Project_Assignments.findAll({
        where: { employee_id: req.params.employee_id },
        include: [
          {
            model: sequelizeModels.Project
          }
        ]
      })
      return res.json(project_assignments)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  return router
}
