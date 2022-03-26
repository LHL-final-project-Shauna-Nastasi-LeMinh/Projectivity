const express = require("express");
const column = require("../models/column");
const users = require("./users");
const router = express.Router();

module.exports = (sequelizeModels) => {
  projectTickets = sequelizeModels.ProjectAssignment;
  Ticket = sequelizeModels.Ticket;

  router.get("/:employee_id", async (req, res) => {
    try {
      const project_assignments = await Project_Assignments.findAll({
        where: { employee_id: req.params.employee_id }, // selectedProject
        include: [
          {
            model: sequelizeModels.Project,
          },
        ],
      });

      const columns = await column.findAll({
        where: { project_id: project_assignments[0].project_id },
        include: [
          {
            model: sequelizeModels.Ticket,
          },
        ],
      });

      return res.json(columns);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.post("/new", async (req, res) => {
    try {
      const {
        title,
        description,
        created_by,
        column_id,
        severity,
        priority,
        type,
        milestone,
      } = req.body;

      const newTicket = await Tickets.create({
        title,
        description,
        created_by,
        column_id,
        severity,
        priority,
        type,
        milestone,
      });

      return res.json(newTicket);
    } catch (err) {
      console.log(err, "foo");
      return res.status(500).json(err);
    }
  });

  router.delete("/:ticket_id", async (req, res) => {
    try {
      const ticket_id = req.params.ticket_id;
      Tickets.destroy({
        where: {
          id: ticket_id,
        },
      });

      return res.json("success!");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.post("/:ticket_id", async (req, res) => {
    try {
      const { id, title, description, severity, priority, type, milestone } =
        req.body;
      await Tickets.update(
        { title, description, severity, priority, type, milestone },
        {
          where: {
            id: id,
          },
        }
      );
      const updatedTicket = await Tickets.findAll({
        where: { id: id },
      });
      console.log("backend", updatedTicket);

      return res.json(updatedTicket);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  router.post("/updateColumn", async (req, res) => {
    try {
      const { ticketId, newColumnId } = req.body;
      await Ticket.update(
        { column_id: newColumnId },
        { where: { id: ticketId } }
      );
      return res.json({ message: "Column updated for ticket" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
  return router;
};
