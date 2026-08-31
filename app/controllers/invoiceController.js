const Invoice = require("../models/Invoice");
const Order = require("../models/Order");

const createInvoice = async (req, res) => {
  try {
    const {
      order_id,
      status = "unpaid"
    } = req.body;

    if (!order_id) {
      return res.status(400).json({
        success: false,
        message: "order_id is required"
      });
    }

    const order = await Order.findById(order_id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    const existingInvoice =
      await Invoice.findOne({
        order_id
      });

    if (existingInvoice) {
      return res.status(400).json({
        success: false,
        message: "Invoice already exists for this order"
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
      `INV-${year}${month}${day}`;

    const lastInvoice =
      await Invoice.findOne({
        invoice_number: {
          $regex: `^${prefix}`
        }
      }).sort({
        createdAt: -1
      });

    let number = 1;

    if (lastInvoice) {
      number =
        parseInt(
          lastInvoice.invoice_number.split("-")[2]
        ) + 1;
    }

    const invoice_number =
      `${prefix}-${String(number).padStart(3, "0")}`;

    const invoice = await Invoice.create({
      invoice_number,
      order_id: order._id,
      subtotal: order.subtotal,
      shipping_fee: order.shipping_fee,
      discount: order.discount,
      total: order.total,
      status
    });

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate({
        path: "order_id"
      })
      .sort({
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      data: invoices
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoice =
      await Invoice.findById(
        req.params.id
      ).populate({
        path: "order_id"
      });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found"
      });
    }

    res.status(200).json({
      success: true,
      data: invoice
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const {
      status
    } = req.body;

    const updateData = {};

    if (status !== undefined) {
      updateData.status = status;
    }

    const invoice =
      await Invoice.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true
        }
      );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: invoice
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const invoice =
      await Invoice.findByIdAndDelete(
        req.params.id
      );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice
};