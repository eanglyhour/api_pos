const Category = require("../models/categoryModel");

// GET ALL
exports.getAll = async (req, res) => {
  try {

    const categories = await Category.find();

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// GET BY ID
exports.getById = async (req, res) => {
  try {

    const category = await Category.findById(
      req.params.id
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.json({
      success: true,
      data: category
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// CREATE
exports.create = async (req, res) => {
  try {

    const {
      name,
      description,
      status
    } = req.body;

     if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required"
      });
    }


    const category = await Category.create({
      name,
      description,
      status
    });

    res.status(201).json({
      success: true,
      data: category
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


// UPDATE
exports.update = async (req, res) => {
  try {

    const {
      name,
      description,
      status
    } = req.body;

    const category =
      await Category.findByIdAndUpdate(
        req.params.id,
        {
          name,
          description,
          status
        },
        {
          new: true,
          runValidators: true
        }
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.json({
      success: true,
      data: category
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


// DELETE
exports.delete = async (req, res) => {
  try {

    const category =
      await Category.findByIdAndDelete(
        req.params.id
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.json({
      success: true,
      message: "Category deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};