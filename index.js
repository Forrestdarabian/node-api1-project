// implement your API here
const express = require("express");
const db = require("./data/db.js");
const server = express();

server.get("/api/users", (req, res) => {
  db.find().then(users => res.status(200).json(users));
});
server.listen(8000, () => console.log("server is running!!!"));
