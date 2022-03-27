const sequelizeModels = require('../../models')

module.exports = async function addNotification (user_id, message, creator) {
  const Notification = sequelizeModels.Notification;
  try {
    await Notification.create({
      user_id,
      message,
      creator,
      unread: true
    })
  } catch(err) {
    console.log(err);
  }
}
