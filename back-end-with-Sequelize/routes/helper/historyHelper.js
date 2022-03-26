const sequelizeModels = require('../../models')


module.exports = async function addHistoryEvent (ticket_id, event, source_value, dest_value, updater ) {
  const History = sequelizeModels.History;
  try {
    await History.create({
      ticket_id,
      event,
      source_value,
      dest_value,
      updater
    })
  } catch(err) {
    console.log(err);
  }
}
