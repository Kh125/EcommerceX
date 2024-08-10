const Order = require("../models/Order");
const Product = require("../models/Product");

module.exports.orders = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ userId: id }).sort({ orderDate: -1 });

    if (!orders) res.status(400).json({ message: "Error fetching Orders" });

    res
      .status(200)
      .json({ message: "All orders successfully fetched.", orders });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ errors: error, message: "Error fetching Orders" });
  }
};

module.exports.getOrderById = async (req, res) => {
  const { id, orderId } = req.params;
  // console.log(id, orderId);

  try {
    const order = await Order.findById(orderId);

    if (!order)
      return res.status(400).json({ errors: "Error fetching order!" });

    res.status(200).json({ message: "Order is successfully fetched.", order });
  } catch (error) {
    console.log("Fetching Order Error", error);
    res.status(400).json({ errors: error, message: "Error fetching order!" });
  }
};

module.exports.createOrder = async (req, res) => {
  try {
    const { order } = req.body;

    const newOrder = await Order.create(order);

    if (!newOrder)
      return res.status(400).json({ errors: "Error creating order!" });

    await updateProductRemainingStock(newOrder?.products);

    res.status(201).json({ message: "Order is successfully created.", order });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ errors: error, message: "Error creating Orders" });
  }
};

// Private methods
const updateProductRemainingStock = async (orderedProducts) => {
  console.log("orderedProducts", orderedProducts);

  for (const item of orderedProducts) {
    const product = await Product.findById(item.productId);

    if (product) {
      product.remainingStock = product.remainingStock - item.quantity;

      await product.save();
    }
  }
};
