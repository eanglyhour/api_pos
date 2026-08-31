const Permission = require("../models/Permission");

const getAll = async (req, res, next) => {
  try {
    const permissions = await Permission.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Permissions retrieved successfully",
      data: permissions,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const permission = await Permission.findById(
      req.params.id
    );

    if (!permission) {
      return res.status(404).json({
        message: "Permission not found",
      });
    }

    res.status(200).json({
      message: "Permission retrieved successfully",
      data: permission,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;

    const permission = await Permission.findById(
      req.params.id
    );

    if (!permission) {
      return res.status(404).json({
        message: "Permission not found",
      });
    }

    if (name !== undefined) {
      const exists = await Permission.findOne({
        name: name.trim(),
        _id: { $ne: req.params.id },
      });

      if (exists) {
        return res.status(409).json({
          message: "Permission name already exists",
        });
      }

      permission.name = name.trim();
    }

    if (description !== undefined) {
      permission.description = description.trim();
    }

    if (status !== undefined) {
      permission.status = status;
    }

    await permission.save();

    res.status(200).json({
      message: "Permission updated successfully",
      data: permission,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  update,
};