const realtime = (pusher) => {

  // Temporary testing code only.

  let users = [];
  pusher.trigger("MESSAGE_CHANNEL_NAME", "EVENT_NAME", {
    books: books,
  });

  socket.on('MESSAGE_CHANNEL_NAME', (data) => {
    console.log("message came back from client!");
    console.log(data);
    socket.broadcast.emit("MESSAGE_CHANNEL_NAME", data);
  })

  // io.on('connection', (socket) => {
  //   console.log("Someone has connected!");
  //   socket.on('disconnect', () => {
  //     console.log('Someone has disconnected!', socket.name);
  //   })

  //   // Code goes here, process different real time data with different channels
  //   socket.on('MESSAGE_CHANNEL_NAME', (data) => {
  //     console.log("message came back from client!");
  //     console.log(data);
  //     socket.broadcast.emit("MESSAGE_CHANNEL_NAME", data);
  //   })
  // })
};

module.exports = {realtime};
