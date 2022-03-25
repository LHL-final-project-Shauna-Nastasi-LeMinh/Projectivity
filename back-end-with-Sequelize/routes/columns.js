const express = require('express');
const router = express.Router();
const COLUMN_CHANNEL = "Column_Channel"
const COLUMN_MOVE_EVENT = "Column_Move_Event"

module.exports = (sequelizeModels, pusher) => {

  Column = sequelizeModels.Column;
  Ticket = sequelizeModels.Ticket;

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
    const project_id = req.body.project_id;
    const orderingObject = req.body.ordering
    try {
      for (const columnId in orderingObject) {
        await Column.update(
          { ordering_index: orderingObject[columnId] },
          { where: { id: columnId } }
        )
      }
      // WebSocket broadcast
      const columns = await Columns.findAll({
        where: { project_id: project_id},
        include: [
          {
            model: sequelizeModels.Ticket
          }
        ],
        order: [['ordering_index', 'ASC']]
      })
      pusher.trigger(COLUMN_CHANNEL, COLUMN_MOVE_EVENT, columns);
      // End WebSocket

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


