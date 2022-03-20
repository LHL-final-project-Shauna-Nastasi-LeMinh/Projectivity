const sequelizeModels = require('./models');
const cors = require("cors");
const express = require('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");
require('dotenv').config();

const Pusher = require("pusher");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors())
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Pusher WebSocket server
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

// All routes (controller) goes here
const usersRoutes = require("./routes/users");
const accessControlRoutes = require("./routes/accessControl")
const roleRoutes = require("./routes/roles")

// pass the whole models, as well pusher server, to routes.
//Consider refactor to pass individual model object only, e.g. sequelizeModels.USER if only access 1 table

// this userRoutes is for demo purpose only. Please do not use it
app.use("/users", usersRoutes(sequelizeModels, pusher));

// All routes go here
app.use("/accessControl", accessControlRoutes(sequelizeModels));
app.use("/roles", roleRoutes(sequelizeModels));

app.get("/", (req, res) => {
  res.render("index");
});


app.listen(PORT, async () => {
  await sequelizeModels.sequelize.authenticate();
  console.log(`Back-end app listening on port ${PORT}`);
})

