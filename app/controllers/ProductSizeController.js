const ProductSize = require("../models/productSizeModel");
const Product = require("../models/productModel");

// CREATE SIZE
exports.create = async (req, res) => {
  try {
    const {
      product_id,
      size,
      const_price,
      sell_price,
      stock
    } = req.body;

    // Check product
    const product = await Product.findById(product_id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Prevent duplicate size
    const exists = await ProductSize.findOne({
      product_id,
      size
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "This size already exists"
      });
    }

    // Validate price
    if (sell_price < const_price) {
      return res.status(400).json({
        success: false,
        message: "sell_price must be greater than or equal to const_price"
      });
    }

    const productSize = await ProductSize.create({
      product_id,
      size,
      const_price,
      sell_price,
      stock
    });

    res.status(201).json({
      success: true,
      message: "Product size created successfully",
      data: productSize
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// GET ALL SIZE
exports.getAll = async (req, res) => {
  try {
    const sizes = await ProductSize.find()
      .populate("product_id", "name");

    res.json({
      success: true,
      data: sizes
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// GET SIZE BY ID
exports.getById = async (req, res) => {
  try {
    const size = await ProductSize.findById(
      req.params.id
    ).populate("product_id", "name");

    if (!size) {
      return res.status(404).json({
        success: false,
        message: "Product size not found"
      });
    }

    res.json({
      success: true,
      data: size
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// UPDATE SIZE
exports.update = async (req, res) => {
  try {
    const {
      size,
      const_price,
      sell_price,
      stock
    } = req.body;

    // Validate price
    if (sell_price < const_price) {
      return res.status(400).json({
        success: false,
        message: "sell_price must be greater than or equal to const_price"
      });
    }

    // Check duplicate size
    const exists = await ProductSize.findOne({
      product_id: (
        await ProductSize.findById(req.params.id)
      )?.product_id,
      size,
      _id: { $ne: req.params.id }
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "This size already exists"
      });
    }

    const productSize = await ProductSize.findByIdAndUpdate(
      req.params.id,
      {
        size,
        const_price,
        sell_price,
        stock
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!productSize) {
      return res.status(404).json({
        success: false,
        message: "Product size not found"
      });
    }

    res.json({
      success: true,
      message: "Product size updated successfully",
      data: productSize
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// DELETE SIZE
exports.delete = async (req, res) => {
  try {
    const productSize = await ProductSize.findByIdAndDelete(
      req.params.id
    );

    if (!productSize) {
      return res.status(404).json({
        success: false,
        message: "Product size not found"
      });
    }

    res.json({
      success: true,
      message: "Product size deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};