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

  router.post('/updateName', async (req, res) => {
    try {
      const {id, name} = req.body

      const updatedColumn = await Column.update(
        { name: name },
        { where: { id: id } }
      )
      return res.json(updatedColumn);
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  router.post('/reodering', async (req, res) => {
    try {
      for (const columnId in req.body) {
        await Column.update(
          { ordering_index: req.body[columnId] },
          { where: { id: columnId } }
        )

      }
      return res.json({message: "column reordered successfully"});
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
      const {id} = req.body

      await Column.destroy({
        where: { id: req.params.id },
      })
      return res.json({message: "Column deleted successfully"});
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })
  return router;
};


