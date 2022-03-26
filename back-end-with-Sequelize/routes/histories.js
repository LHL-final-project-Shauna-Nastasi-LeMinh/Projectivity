const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels, pusher) => {

  History = sequelizeModels.History;

  router.get('/', async(req, res) => {
    try {
      const types = await History.findAll()
      return res.json( types );
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  return router;
};
