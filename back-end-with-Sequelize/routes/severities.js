const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels, pusher) => {

  Severity = sequelizeModels.Severity;

  router.get('/', async(req, res) => {
    try {
      const severities = await Severity.findAll()
      return res.json( severities );
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  return router;
};
