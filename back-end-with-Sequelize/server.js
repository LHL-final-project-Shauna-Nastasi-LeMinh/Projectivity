const sequelizeModels = require('./models');
const cors = require("cors");
const express = require('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
require('dotenv').config();
const {realtime} = require('./realtime/realtime')

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors())
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ["da097fa0-b5ef-4506-b8c3-28166cb4c4e8", "f0553cf8-a720-45d0-abba-e25dbc47eee6"]
}));

// WebSocket initilization
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketio(server,  { cors: {
  origin: process.env.REACT_APP_URL,
  methods: ["GET", "POST"]
}
});
realtime(io);

// All routes (controller) goes here
const usersRoutes = require("./routes/users");

// pass the whole models to routes. Consider refactor to pass individual model object only, e.g. sequelizeModels.USER if only access 1 table
app.use("/users", usersRoutes(sequelizeModels));

app.get("/", (req, res) => {
  res.render("index");
});


server.listen(PORT, async () => {
  await sequelizeModels.sequelize.authenticate();
  console.log(`Back-end app listening on port ${PORT}`);
})

