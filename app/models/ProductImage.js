const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
      required: true,
    },

    is_primary: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ProductImage",
  productImageSchema
);