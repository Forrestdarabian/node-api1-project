// implement your API here
const express = require("express");
const db = require("./data/db.js");
const server = express();
server.use(express.json());
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
server.post("/api/users", (req, res) => {
  console.log(req.body);
  const user = req.body;
  db.insert(user)
    .then(idObject => db.findById(idObject.id))
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "server error retrieving user" });
    });
});
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      console.log("user", user);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "This user does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The users info could not be retrieved" });
    });
});
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(() => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "server error deleting" });
    });
});
server.listen(8000, () => console.log("server is running!!!"));
