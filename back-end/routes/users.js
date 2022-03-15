const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

    router.put("/", (request, response) => {

      const { firstname, lastname } = request.body;

      db.query(`INSERT INTO users (firstname, lastname) VALUES ($1, $2)`, [firstname, lastname])
        .then(() => {
            response.status(204).json({});
        })
        .catch(error => console.log(error));
    });

  return router;
};
