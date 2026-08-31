const express = require("express");

const router = express.Router();

const {
  getOrderItems,
  getOrderItemsByOrderId,
  getOrderItemById,
  deleteOrderItem,
} = require("../controllers/orderItemController");

router.get("/", getOrderItems);

router.get("/order/:orderId", getOrderItemsByOrderId);

router.get("/:id", getOrderItemById);

router.delete("/:id", deleteOrderItem);

module.exports = router;