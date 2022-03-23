const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels, pusher) => {

  Priority = sequelizeModels.Priority;

  router.get('/', async(req, res) => {
    try {
      const priorities = await Priority.findAll()
      return res.json( priorities );
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  return router;
};
