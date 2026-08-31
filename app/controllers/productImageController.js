const ProductImage = require("../models/ProductImage");
const cloudinary = require("../config/cloudinary");

// GET ALL
exports.getAllImages = async (req, res) => {
  try {
    const images = await ProductImage.find()
      .populate("product_id")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY PRODUCT
exports.getImagesByProduct = async (req, res) => {
  try {
    const images = await ProductImage.find({
      product_id: req.params.productId,
    }).sort({
      is_primary: -1,
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ONE
exports.getImageById = async (req, res) => {
  try {
    const image = await ProductImage.findById(
      req.params.id
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Product image not found",
      });
    }

    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE
exports.createImage = async (req, res) => {
  try {
    const { product_id, is_primary } = req.body;

    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: "product_id is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const primary =
      is_primary === true ||
      is_primary === "true";

    if (primary) {
      await ProductImage.updateMany(
        { product_id },
        {
          $set: {
            is_primary: false,
          },
        }
      );
    }

    const productImage =
      await ProductImage.create({
        product_id,
        image: req.file.path,
        public_id: req.file.filename,
        is_primary: primary,
      });

    res.status(201).json({
      success: true,
      message:
        "Product image created successfully",
      data: productImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
exports.updateImage = async (req, res) => {
  try {
    const image = await ProductImage.findById(
      req.params.id
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Product image not found",
      });
    }

    const {
      product_id,
      is_primary,
    } = req.body;

    const newProductId =
      product_id || image.product_id;

    const primary =
      is_primary === true ||
      is_primary === "true";

    if (primary) {
      await ProductImage.updateMany(
        {
          product_id: newProductId,
          _id: { $ne: image._id },
        },
        {
          $set: {
            is_primary: false,
          },
        }
      );
    }

    if (req.file) {
      if (image.public_id) {
        await cloudinary.uploader.destroy(
          image.public_id
        );
      }

      image.image = req.file.path;
      image.public_id = req.file.filename;
    }

    image.product_id = newProductId;

    if (is_primary !== undefined) {
      image.is_primary = primary;
    }

    await image.save();

    res.status(200).json({
      success: true,
      message:
        "Product image updated successfully",
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
exports.deleteImage = async (req, res) => {
  try {
    const image = await ProductImage.findById(
      req.params.id
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Product image not found",
      });
    }

    if (image.public_id) {
      await cloudinary.uploader.destroy(
        image.public_id
      );
    }

    await ProductImage.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Product image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};