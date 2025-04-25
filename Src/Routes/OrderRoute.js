const express = require("express");
const router = express.Router();
const {
  AddProducttoCartController,
  DeleteProductFromCartController,
  ProcessOrderController,
  PlaceOrderController,
  OrderDeliveredController,
} = require("../Controller/OrderController");

router.post("/add-product-to-cart", AddProducttoCartController);
router.delete("/delete-product-from-cart", DeleteProductFromCartController);
router.post("/place-order", ProcessOrderController);
router.post("/process-order", PlaceOrderController);
router.post("/delivered", OrderDeliveredController);
module.exports = router;
