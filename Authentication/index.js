require("dotenv").config();
require("./users");
const bcrypt = require("bcrypt");
const User = require("./users");
const express = require("express");
const app = express();
const port = process.env.PORt || 3000;
app.use(express.json());

// *********************
// const hashPassword = async () => {
//   const password = "12345";
//   const hashedPassword = await bcrypt.hash(password, 8);
//   console.log(hashedPassword);
//   const ismatch = await bcrypt.compare(password, hashedPassword);
//   console.log(ismatch);
// };
// hashPassword();

// *********************

app.get("/user", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.post("/user/add", async (req, res) => {
  try {
    const user = await new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
// ****************
app.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.name, req.body.password);
    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
// ****************

app.delete("/user/delete", async (req, res) => {
  const id = req.body.id;
  try {
    await User.findByIdAndDelete(id);
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.delete("/user/deleteAll", async (req, res) => {
  try {
    await User.deleteMany({});
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.listen(port, () => {
  console.log("server is up " + port);
});
