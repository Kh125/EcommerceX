const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    requierd: [true, "Product name is required"],
    maxLength: [50, "Maximum length is 50 character"],
  },
  description: {
    type: String,
    requierd: [true, "Product name is required"],
    maxLength: [200, "Maximum length is 200 character"],
  },
  price: {
    type: Number,
    requierd: [true, "Price is required."],
  },
  stock: {
    type: Number,
  },
  color: {
    type: String,
  },
  remainingStock: {
    type: Number,
    default: 0,
  },
  buyCount: {
    type: Number,
    default: 0,
  },
  availability: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    default: "In Stock",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
