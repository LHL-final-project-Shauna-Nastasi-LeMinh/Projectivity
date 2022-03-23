const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels, pusher) => {

  Types = sequelizeModels.Types;

  router.get('/', async(req, res) => {
    try {
      const types = await Types.findAll()
      return res.json( types );
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  return router;
};
