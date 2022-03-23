const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels, pusher) => {

  Build = sequelizeModels.Build;

  router.get('/', async(req, res) => {
    try {
      const builds = await Build.findAll()
      return res.json( builds );
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  return router;
};
