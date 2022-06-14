const express = require("express");

const server = express();
const port = process.env.PORT || 5000;
server.use(express.json());

server.get("/numbers", (req, res) => {
  res.send(`success using ${req.method}`);
});

server.put("/numbers", (req, res) => {
  res.send(`success using ${req.method}`);
});

server.delete("/numbers", (req, res) => {
  res.send(`success using ${req.method}`);
});

server.post("/numbers", (req, res) => {
  res.send(`success using ${req.method}`);
});
server.listen(port, () => {
  console.log(`Server is up and listening on Port ${port}`);
});
