const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels, pusher) => {

  Employee = sequelizeModels.Employee;

  router.get('/withoutHR', async(req, res) => {
    try {
      const Op = require('sequelize').Op;
      const employees = await Employee.findAll({where: {role_id: { [Op.ne]: 1 }}})
      return res.json( employees );
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  router.get('/:employee_id', async(req, res) => {

    const {employee_id} = req.params

    try {

      const employee = await Employee.findAll({where: {id: employee_id}})
      return res.json( employee );
    } catch(err) {
      console.log("ERROR",err);
      return res.status(500).json(err);
    }
  })

  return router;
};
