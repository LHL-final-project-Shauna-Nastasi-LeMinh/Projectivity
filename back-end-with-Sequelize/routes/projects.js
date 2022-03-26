const express = require("express");
const users = require("./users");
const router = express.Router();

module.exports = (sequelizeModels) => {
  Project_Assignments = sequelizeModels.ProjectAssignment;
  Columns = sequelizeModels.Column;
  Projects = sequelizeModels.Project;
  Tickets = sequelizeModels.Ticket;
  History = sequelizeModels.History;

  router.get("/user_data/:employee_id", async (req, res) => {
    try {
      console.log("INSIDE PROJECTS");

      const project_assignments = await Project_Assignments.findAll({
        where: { employee_id: req.params.employee_id },
        include: {
          model: Projects,
        },
      });
      const allColumns = await Columns.findAll();
      const allTickets = await Tickets.findAll();
      const allHistories = await History.findAll();

      const userProjects = project_assignments.map((data) => {
        return data.Project.dataValues;
      });

      const userProjectIds = userProjects.map((data) => {
        return data.id;
      });

      const userColumns = allColumns.map((data) => {
        if (userProjectIds.includes(data.dataValues.project_id)) {
          return data.dataValues;
        }
      });

      const userColumnIds = userColumns.map((data) => {
        return data.id;
      });

      const userTickets = allTickets.map((data) => {
        if (userColumnIds.includes(data.dataValues.column_id)) {
          return data.dataValues;
        }
      });

      const userData = {
        userProjects: userProjects,
        userColumns: userColumns,
        userTickets: userTickets,
      };

      return res.json(userData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.get("/:employee_id", async (req, res) => {
    try {
      const project_assignments = await Project_Assignments.findAll({
        where: { employee_id: req.params.employee_id },
        include: [
          {
            model: sequelizeModels.Project,
          },
        ],
        order: [["id", "ASC"]],
      });

      const projects = project_assignments.map(
        (assignment) => assignment.dataValues.Project.dataValues
      );
      const firstProjectId = projects[0].id;

      const firstProjectColumnsRaw = await Columns.findAll({
        where: { project_id: firstProjectId },
        include: [
          {
            model: sequelizeModels.Ticket,
          },
        ],
        order: [["ordering_index", "ASC"]],
      });

      projects[0].Columns = firstProjectColumnsRaw.map(
        (column) => column.dataValues
      );
      return res.json(projects);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.post("/new", async (req, res) => {
    try {
      const { name, description, employee_id, assigneeIds } = req.body;
      const project = await Projects.create({
        name,
        description,
      });

      const project_id = project.dataValues.id;
      const assignment_date = Date.now();

      assignmentBulkCreateObject = assigneeIds.map(assigneeId => {
        return {employee_id: assigneeId, project_id, assignment_date}
      })
      assignmentBulkCreateObject.push({employee_id, project_id, assignment_date})
      await Project_Assignments.bulkCreate(assignmentBulkCreateObject)

      // await Columns.create({
      //   name: "Open",
      //   project_id,
      // });
      // await Columns.create({
      //   name: "In Progress",
      //   project_id,
      // });
      // await Columns.create({
      //   name: "Closed",
      //   project_id,
      // });

      return res.json("success!");


    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.get("/:project_id/columns/", async (req, res) => {
    try {
      const columns = await Columns.findAll({
        where: { project_id: req.params.project_id },
        include: [
          {
            model: sequelizeModels.Ticket,
          },
        ],
        order: [["ordering_index", "ASC"]],
      });
      return res.json(columns);
    } catch (err) {
      console.log(err);
    }
  });

  router.delete("/:project_id/delete", async (req, res) => {
    try {
      const project_id = req.params.project_id;
      Projects.destroy({
        where: {
          id: project_id,
        },
      });

      Project_Assignments.destroy({
        where: {
          project_id: project_id,
        },
      });

      const columns_data = await Columns.findAll({
        where: {
          project_id: project_id,
        },
      });

      const column_ids = columns_data.map((column) => column.dataValues.id);

      console.log(column_ids);

      for (const column of column_ids) {
        console.log(column);
        Tickets.destroy({
          where: {
            column_id: column,
          },
        });
      }

      Columns.destroy({
        where: {
          project_id: project_id,
        },
      });

      return res.json("success!");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  return router;
};
