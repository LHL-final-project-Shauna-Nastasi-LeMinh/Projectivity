const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels, pusher) => {

  Notification = sequelizeModels.Notification;

  router.get('/:user_id', async(req, res) => {
    try {
      const notifications = await Notification.findAll({
        where: { user_id: req.params.user_id },
        order: [["createdAt", "DESC"]],
        limit : 8,
      })
      return res.json( notifications );
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  router.get('/:user_id/setUnreadAll', async(req, res) => {
    try {
      const notifications = await Notification.update(
        {unread : false},
        {where: { user_id: req.params.user_id }})
      return res.json( notifications );
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  return router;
};
