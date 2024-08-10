const Product = require("../models/Product");

module.exports.products = async (req, res) => {
  try {
    const products = await Product.find();

    res
      .status(200)
      .json({ message: "All Products successfully fetched", products });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

module.exports.productById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    res.status(200).json({
      message: "Product is successfully fetched",
      product,
    });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

module.exports.create = async (req, res) => {
  const { name, description, price, stock, color } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      color,
      remainingStock: stock,
    });

    res.status(200).json({
      message: "Product is successfully created.",
      product: newProduct._id,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating product!", errors: error });
  }
};

module.exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        color: req.body.color,
      }
    );

    if (!updatedProduct)
      return res.status(400).json({ message: "Product not found!" });

    res
      .status(200)
      .json({ message: "Successfully updated!", product: updatedProduct._id });
  } catch (error) {
    res.status(400).json({ message: "Error updating product", errors: error });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("deleted data", deletedProduct);

    res
      .status(200)
      .json({ message: "Successfully deleted!", product: updatedProduct._id });
  } catch (error) {
    res.status(400).json({ message: "Error deleting product", errors: error });
  }
};
