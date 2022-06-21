require("dotenv").config();
require("./products");
const Product = require("./products");
const express = require("express");
const app = express();
const port = process.env.PORt || 3000;
app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.delete("/products/delete", async (req, res) => {
  const id = req.body.id;
  try {
    await Product.findByIdAndDelete(id);
    const product = await Product.find({});
    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.delete("/products/deleteAll", async (req, res) => {
  try {
    await Product.deleteMany({});
    const product = await Product.find({});
    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.put("/products/update/", async (req, res) => {
  const id = req.body.id;
  const isActive = req.body.isActive;
  console.log(typeof isActive);
  try {
    if (typeof isActive !== "boolean") {
      return res.status(400).send("it should be true or false");
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("this item dose not exist");
    }
    product.isActive = isActive;
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.listen(port, () => {
  console.log("server is up " + port);
});
