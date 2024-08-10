const { Router } = require("express");
const {
  products,
  create,
  productById,
  update,
  deleteProduct,
} = require("../controllers/productController");
const router = Router();

router.get("/", products);
router.post("/", create);
router.get("/:id", productById);
router.post("/:id", update);
router.get("/delete/:id", deleteProduct);

module.exports = router;
