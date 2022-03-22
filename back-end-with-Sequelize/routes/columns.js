const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels) => {

  Column = sequelizeModels.Column;
  router.post('/new', async (req, res) => {
    try {
      const {name, project_id} = req.body

      const newColumn = await Column.create({
        name,
        project_id
      })

      return res.json(newColumn);
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })


  return router;
};
