const sequelizeModels = require('../../models')

module.exports = async function addNotification (user_id, message) {
  const Notification = sequelizeModels.Notification;
  try {
    await Notification.create({
      user_id,
      message
    })
  } catch(err) {
    console.log(err);
  }
}
