const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels) => {

  Role = sequelizeModels.Role;

  router.get('/', async(req, res) => {
    try {
      const roles = await Role.findAll();
      return res.json( roles );
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  return router;
};
