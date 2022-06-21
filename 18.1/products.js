const mongoose = require("mongoose");
const DatebaseUrl = process.env.Datebase_Url;
mongoose.connect(DatebaseUrl, { useNewUrlParser: true });
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
