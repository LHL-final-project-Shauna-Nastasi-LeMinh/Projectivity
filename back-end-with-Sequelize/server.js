const sequelizeModels = require('./models');
const cors = require("cors");
const express = require('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ["da097fa0-b5ef-4506-b8c3-28166cb4c4e8", "f0553cf8-a720-45d0-abba-e25dbc47eee6"]
}));

const sequelize = sequelizeModels.sequelize;

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(sequelizeModels));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});


app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Back-end app listening on port ${PORT}`);
})

