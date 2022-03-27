const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels, pusher) => {

  History = sequelizeModels.History;

  router.get('/:ticket_id', async(req, res) => {
    try {
      const ticketHistories = await History.findAll({
        where: { ticket_id: req.params.ticket_id },
        order: [["createdAt", "ASC"]],
      })
      return res.json( ticketHistories );
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  return router;
};
