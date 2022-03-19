const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels) => {

  Employee = sequelizeModels.Employee;

  router.post('/login', async(req, res) => {
    try {
      const {email, password} = req.body;
      const rawData = await Employee.findAll({
        where: {
          email: email,
          password: password
        }
      })
      const users = JSON.parse(JSON.stringify(rawData))
      return users.length > 0 ? res.json( users[0] ) : res.status(403).json(new Error("Access forbidden"))
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  router.post('/register', async(req, res) => {
    try {
      const {first_name, last_name, phone, email, password, role_id} = req.body;
      const rawData = await Employee.findAll({
        where: {
          email: email,
          password: password
        }
      })
      console.log(first_name, last_name, phone, email, password, role_id);
      // const employee = await Employee.create({first_name, last_name, phone, email, password, role_id})

      return res.json("");
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  return router;
};
