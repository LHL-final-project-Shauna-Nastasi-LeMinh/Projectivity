const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels, pusher) => {

  User = sequelizeModels.User;

  router.put('/', async(req, res) =>  {
    const {firstname, lastname} = req.body;
    try {
      const user = await User.create({firstname, lastname})

      // WebSocket broadcast if neccessary
      pusher.trigger("USER_CHANNEL", "USER_SAVED_EVENT", {user});
      // End WebSocket

      return res.json(user);
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  router.get('/', async(req, res) => {
    try {
      const users = await User.findAll()
      return res.json( users );
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  return router;
};
