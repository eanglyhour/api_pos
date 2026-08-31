const OrderItem = require("../models/OrderItem");

const getOrderItems = async (req, res) => {
  try {
    const items = await OrderItem.find()
      .populate({
        path: "product_size_id",
        select:
          "product_id size const_price sell_price"
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: items
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getOrderItemsByOrderId = async (req, res) => {
  try {
    const items = await OrderItem.find({
      order_id: req.params.orderId
    })
      .populate({
        path: "product_size_id",
        select:
          "product_id size const_price sell_price"
      })
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: items
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getOrderItemById = async (req, res) => {
  try {
    const item = await OrderItem.findById(
      req.params.id
    ).populate({
      path: "product_size_id",
      select:
        "product_id size const_price sell_price"
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Order item not found"
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const item =
      await OrderItem.findByIdAndDelete(
        req.params.id
      );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Order item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order item deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getOrderItems,
  getOrderItemsByOrderId,
  getOrderItemById,
  deleteOrderItem
};