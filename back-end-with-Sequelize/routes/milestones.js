const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels, pusher) => {

  Milestone = sequelizeModels.Milestone;

  router.get('/', async(req, res) => {
    try {
      const milestones = await Milestone.findAll()
      return res.json( milestones );
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  return router;
};
