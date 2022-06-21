const mongoose = require("mongoose");
const validator = require("validator");
const DatebaseUrl = process.env.Datebase_Url;
mongoose.connect(DatebaseUrl, { useNewUrlParser: true });
const detailsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  price: {
    type: Number,
    required: false,
    min: 0,
  },
  discount: {
    type: Number,
    required: false,
    default: 0,
  },
  images: {
    type: Array,
    validate(value) {
      if (value.length < 2)
        throw new Error("Array must contain at least 2 images");
      else {
        value.forEach((image) => {
          if (!validator.isURL(image))
            throw new Error("Array must only contains URL to images");
        });
      }
    },
  },
  phoneNumber: {
    type: String,
    validate(value) {
      if (!validator.isMobilePhone(value, "he-IL"))
        throw new Error("phone number is invalid");
    },
  },
  dateAdded: {
    type: Date,
    default: new Date(),
  },
});
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
  details: {
    type: detailsSchema,
  },
});
const Product = mongoose.model("Product", productSchema);
