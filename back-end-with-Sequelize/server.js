const sequelizeModels = require('./models');
const cors = require("cors");
const express = require('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors({credentials: true}));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ["da097fa0-b5ef-4506-b8c3-28166cb4c4e8", "f0553cf8-a720-45d0-abba-e25dbc47eee6"]
}));

// WebSocket
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);




app.use(cors())
app.options('*', cors());




const ikea = require('ikea-name-generator');

let users = [];
io.on('connection', (socket) => {
  console.log("Someone has connected!");
  const name = ikea.getName();
  users.push(name);
  socket.emit('INITIAL', {name, users});
  socket.broadcast.emit("NEW_USER", {name});
  socket.name = name;

  socket.on('disconnect', () => {
    console.log('Someone has disconnected!', socket.name);
    socket.broadcast.emit("DISCONNECT_USER", {name: socket.name});
    users = users.filter(name => name !== socket.name);
  })

  socket.on('message', (data) => {
    console.log("message came back from client!");
    console.log(data);
    socket.broadcast.emit("MESSAGE", data);
  })
})


const sequelize = sequelizeModels.sequelize;

// All routes (controller) goes here
const usersRoutes = require("./routes/users");

// pass the whole models to routes. Consider refactor to pass individual model object only, e.g. sequelizeModels.USER if only access 1 table
app.use("/users", usersRoutes(sequelizeModels));

app.get("/", (req, res) => {
  res.render("index");
});


app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Back-end app listening on port ${PORT}`);
})

