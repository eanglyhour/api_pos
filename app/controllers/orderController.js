const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const ProductSize = require("../models/productSizeModel");

const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      items,
      shipping_fee = 0,
      discount = 0
    } = req.body;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "user_id is required"
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "items are required"
      });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const {
        product_size_id,
        quantity
      } = item;

      if (!product_size_id) {
        return res.status(400).json({
          success: false,
          message: "product_size_id is required"
        });
      }

      if (!quantity || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "quantity must be at least 1"
        });
      }

      const productSize =
        await ProductSize.findById(product_size_id);

      if (!productSize) {
        return res.status(404).json({
          success: false,
          message:
            `Product size ${product_size_id} not found`
        });
      }

      if (productSize.stock < quantity) {
        return res.status(400).json({
          success: false,
          message:
            `Not enough stock. Available: ${productSize.stock}`
        });
      }

      const itemSubtotal =
        productSize.sell_price * quantity;

      subtotal += itemSubtotal;

      orderItems.push({
        product_size_id: productSize._id,
        quantity,
        price: productSize.sell_price,
        subtotal: itemSubtotal
      });
    }

    const total =
      subtotal +
      Number(shipping_fee) -
      Number(discount);

    if (total < 0) {
      return res.status(400).json({
        success: false,
        message: "Total cannot be negative"
      });
    }

    const date = new Date();

    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    const prefix =
      `ORD-${year}${month}${day}`;

    const lastOrder =
      await Order.findOne({
        order_number: {
          $regex: `^${prefix}`
        }
      }).sort({
        createdAt: -1
      });

    let number = 1;

    if (lastOrder) {
      number =
        parseInt(
          lastOrder.order_number.split("-")[2]
        ) + 1;
    }

    const order_number =
      `${prefix}-${String(number).padStart(3, "0")}`;

    const order = await Order.create({
      order_number,
      user_id,
      subtotal,
      shipping_fee,
      discount,
      total
    });

    const itemsToCreate = orderItems.map((item) => ({
      order_id: order._id,
      product_size_id: item.product_size_id,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.subtotal
    }));

    const createdItems =
      await OrderItem.insertMany(itemsToCreate);

    for (const item of orderItems) {
      await ProductSize.findByIdAndUpdate(
        item.product_size_id,
        {
          $inc: {
            stock: -item.quantity
          }
        }
      );
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: {
        order,
        items: createdItems
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    const items = await OrderItem.find({
      order_id: order._id
    })
      .populate({
        path: "product_size_id",
        select:
          "product_id size const_price sell_price"
      })
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: {
        order,
        items
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const {
      status,
      payment_status
    } = req.body;

    const updateData = {};

    if (status !== undefined) {
      updateData.status = status;
    }

    if (payment_status !== undefined) {
      updateData.payment_status =
        payment_status;
    }

    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true
        }
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order =
      await Order.findByIdAndDelete(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    await OrderItem.deleteMany({
      order_id: order._id
    });

    res.status(200).json({
      success: true,
      message: "Order deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};