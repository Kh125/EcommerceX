const express = require("express");
const {
  orders,
  createOrder,
  getOrderById,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/:id", orders);
router.get("/:id/:orderId", getOrderById);
router.post("/", createOrder);

module.exports = router;
