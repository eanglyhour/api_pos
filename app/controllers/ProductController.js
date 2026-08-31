const Product = require("../models/productModel");
const ProductSize = require("../models/productSizeModel");
const ProductImage = require("../models/ProductImage");

// CREATE
exports.create = async (req, res) => {
  try {
    const {
      category_id,
      name
    } = req.body;

    const product = await Product.create({
      category_id,
      name
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// GET ALL
exports.getAll = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category_id", "name")
      .lean();

    for (const product of products) {

      // Get sizes
      const sizes = await ProductSize.find({
        product_id: product._id
      }).lean();

      product.sizes = sizes;

      // Get images
      const images = await ProductImage.find({
        product_id: product._id
      })
        .select("image public_id is_primary")
        .lean();

      product.images = images;

      // Total stock from sizes
      product.total_stock = sizes.reduce(
        (total, item) => total + item.stock,
        0
      );
    }

    res.json({
      success: true,
      data: products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// GET ONE
exports.getById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id)
      .populate("category_id", "name")
      .lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Get sizes
    const sizes = await ProductSize.find({
      product_id: product._id
    }).lean();

    product.sizes = sizes;

    // Get images
    const images = await ProductImage.find({
      product_id: product._id
    })
      .select("image public_id is_primary")
      .lean();

    product.images = images;

    // Calculate total stock
    product.total_stock = sizes.reduce(
      (total, item) => total + item.stock,
      0
    );

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const {
      category_id,
      name
    } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        category_id,
        name
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// DELETE
exports.delete = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Delete all sizes belonging to product
    await ProductSize.deleteMany({
      product_id: req.params.id
    });

    res.json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};