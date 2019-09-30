// implement your API here
const express = require("express");
const db = require("./data/db.js");
const server = express();

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
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
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
      res.status(500).json({ error: "The user info could not be retrieved" });
    });
});

server.listen(8000, () => console.log("server is running!!!"));
