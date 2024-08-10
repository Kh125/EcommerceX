const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required!"],
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    default: "Pending",
  },
  totalAmount: {
    type: Number,
    required: [true, "Total amount is required!"],
    min: [0, "Total amount cannot be negative!"],
  },
  paymentType: {
    type: Number,
    default: 0,
    // O for COD, 1 for Mobile Banking, 2 for Promo, 3 for lucky draw
  },
  paymentDone: {
    type: Boolean,
    default: false,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product ID is required!"],
      },
      name: {
        type: String,
        required: [true, "Product name is required!"],
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required!"],
        min: [1, "Quantity must be at least 1!"],
      },
      price: {
        type: Number,
        required: [true, "Price is required!"],
        min: [0, "Price cannot be negative!"],
      },
    },
  ],
  shippingAddress: {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
  },
});

module.exports = mongoose.model("Order", OrderSchema);
