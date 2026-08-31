const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoice_number: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0
    },

    shipping_fee: {
      type: Number,
      default: 0,
      min: 0
    },

    discount: {
      type: Number,
      default: 0,
      min: 0
    },

    total: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: [
        "paid",
        "unpaid"
      ],
      default: "unpaid"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Invoice",
  invoiceSchema
);