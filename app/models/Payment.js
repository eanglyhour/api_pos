const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true
    },

    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

    payment_method: {
      type: String,
      enum: ["KHQR"],
      default: "KHQR"
    },

    transaction_id: {
      type: String,
      default: null
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },

    md5: {
      type: String,
      unique: true,
      sparse: true
    },

    transaction_hash: {
      type: String,
      default: null
    },

    from_account_id: {
      type: String,
      default: null
    },

    to_account_id: {
      type: String,
      default: null
    },

    payment_date: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Payment", paymentSchema);