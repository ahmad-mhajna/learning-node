require("./products");
require("dotenv").config();
const Product = require("./products");
const express = require("express");
const app = express();
const port = process.env.PORt || 3000;
app.use(express.json());

app.get("/products", (req, res) => {
  Product.find({})
    .then((product) => {
      res.send(product);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});
app.get("/products/findById/:id", (req, res) => {
  const _id = req.params.id;
  Product.findById(_id)
    .then((product) => {
      if (!product) {
        return res.status(404).send("this item dose not exist");
      }
      res.send(product);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});
app.get("/products/active", (req, res) => {
  Product.find({ isActive: true })
    .then((product) => {
      if (product.length === 0) {
        return res.status(404).send("there is no item active right now");
      }
      res.send(product);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});
app.get("/products/price", (req, res) => {
  const minPrice = req.body.minPrice;
  const maxPrice = req.body.maxPrice;
  Product.find({ price: { $lte: maxPrice || 1000000000, $gte: minPrice || 0 } })
    .then((product) => {
      if (product.length === 0) {
        return res
          .status(404)
          .send("there is no product with that price range");
      }
      res.send(product);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

app.listen(port, () => {
  console.log("server is up " + port);
});
