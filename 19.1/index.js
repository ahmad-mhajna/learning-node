require("./products");
require("dotenv").config();
const Product = require("./products");
const express = require("express");
const app = express();
const port = process.env.PORt || 3000;
app.use(express.json());

app.get("/products", async (req, res) => {
  const product = await Product.find({});
  try {
    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.get("/products/findById/:id", async (req, res) => {
  const _id = req.params.id;
  const product = await Product.findById(_id);
  try {
    if (!product) {
      return res.status(404).send("this item dose not exist");
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/products/active", async (req, res) => {
  const product = await Product.find({ isActive: true });
  try {
    if (product.length === 0) {
      return res.status(404).send("there is no item active right now");
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/products/price", async (req, res) => {
  const minPrice = req.body.minPrice;
  const maxPrice = req.body.maxPrice;
  const product = await Product.find({
    price: { $lte: maxPrice || 1000000000, $gte: minPrice || 0 },
  });
  try {
    if (product.length === 0) {
      return res.status(404).send("there is no product with that price range");
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log("server is up " + port);
});
