const sequelizeModels = require("./models");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const Pusher = require("pusher");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());
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
const accessControlRoutes = require("./routes/accessControl");
const employeeRoutes = require("./routes/employees");
const roleRoutes = require("./routes/roles");
const projectRoutes = require("./routes/projects");
const ticketRoutes = require("./routes/tickets");
const columnRoutes = require("./routes/columns");
const severityRoutes = require("./routes/severities");
const priorityRoutes = require("./routes/priorities");
const typeRoutes = require("./routes/types");
const buildRoutes = require("./routes/builds");
const milestoneRoutes = require("./routes/milestones");
const historiesRoutes = require("./routes/histories");
const notificationsRoutes = require("./routes/notifications");
// const getGenericData = require('./routes/getGenericData')
// const getUserData = require('./routes/getUserData')

// pass the whole models, as well pusher server, to routes.
// Consider refactor to pass individual model object only, e.g. sequelizeModels.USER if only access 1 table

// All routes go here
app.use("/accessControl", accessControlRoutes(sequelizeModels));
app.use("/roles", roleRoutes(sequelizeModels));
app.use("/projects", projectRoutes(sequelizeModels));
app.use("/tickets", ticketRoutes(sequelizeModels, pusher));
app.use("/columns", columnRoutes(sequelizeModels, pusher));
app.use("/severities", severityRoutes(sequelizeModels));
app.use("/priorities", priorityRoutes(sequelizeModels));
app.use("/types", typeRoutes(sequelizeModels));
app.use("/builds", buildRoutes(sequelizeModels));
app.use("/milestones", milestoneRoutes(sequelizeModels));
app.use("/employees", employeeRoutes(sequelizeModels));
app.use("/histories", historiesRoutes(sequelizeModels));
app.use("/notifications", notificationsRoutes(sequelizeModels));

// app.use('/getGenericData', getGenericData(sequelizeModels))
// app.use('/getUserData', getUserData(sequelizeModels))

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, async () => {
  await sequelizeModels.sequelize.authenticate();
  console.log(`Back-end app listening on port ${PORT}`);
});
