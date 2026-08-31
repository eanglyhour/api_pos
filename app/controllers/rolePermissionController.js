const RolePermission = require("../models/RolePermission");
const Role = require("../models/Role");
const Permission = require("../models/Permission");

const create = async (req, res, next) => {
  try {
    const { role_id, permission_ids } = req.body;

    if (!role_id || !Array.isArray(permission_ids)) {
      return res.status(400).json({
        message: "role_id and permission_ids are required",
      });
    }

    if (permission_ids.length === 0) {
      return res.status(400).json({
        message: "permission_ids cannot be empty",
      });
    }

    const uniquePermissionIds = [
      ...new Set(permission_ids.map(String)),
    ];

    const role = await Role.findById(role_id);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    const permissions = await Permission.find({
      _id: { $in: uniquePermissionIds },
    });

    if (permissions.length !== uniquePermissionIds.length) {
      return res.status(404).json({
        message: "One or more permissions not found",
      });
    }

    const existing = await RolePermission.find({
      role_id,
      permission_id: { $in: uniquePermissionIds },
    });

    const existingIds = new Set(
      existing.map((item) =>
        item.permission_id.toString()
      )
    );

    const newPermissions = uniquePermissionIds
      .filter(
        (permissionId) =>
          !existingIds.has(permissionId)
      )
      .map((permissionId) => ({
        role_id,
        permission_id: permissionId,
      }));

    if (newPermissions.length === 0) {
      return res.status(409).json({
        message: "All permissions are already assigned",
      });
    }

    await RolePermission.insertMany(newPermissions);

    const rolePermissions = await RolePermission.find({
      role_id,
    })
      .populate("permission_id")
      .sort({ createdAt: -1 });

    const result = rolePermissions
      .map((item) => item.permission_id)
      .filter(Boolean);

    res.status(201).json({
      message: "Permissions assigned successfully",
      data: {
        role_id: role._id,
        role_name: role.name,
        permissions: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const rolePermissions = await RolePermission.find()
      .populate("role_id")
      .populate("permission_id")
      .sort({ createdAt: -1 });

    const roles = {};

    for (const item of rolePermissions) {
      if (!item.role_id || !item.permission_id) {
        continue;
      }

      const roleId = item.role_id._id.toString();

      if (!roles[roleId]) {
        roles[roleId] = {
          role_id: item.role_id._id,
          role_name: item.role_id.name,
          permissions: [],
        };
      }

      roles[roleId].permissions.push(
        item.permission_id
      );
    }

    res.status(200).json({
      message: "Role permissions retrieved successfully",
      data: Object.values(roles),
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const rolePermission =
      await RolePermission.findById(req.params.id)
        .populate("role_id")
        .populate("permission_id");

    if (!rolePermission) {
      return res.status(404).json({
        message: "Role permission not found",
      });
    }

    res.status(200).json({
      message: "Role permission retrieved successfully",
      data: rolePermission,
    });
  } catch (error) {
    next(error);
  }
};

const getByRole = async (req, res, next) => {
  try {
    const role = await Role.findById(req.params.roleId);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    const rolePermissions = await RolePermission.find({
      role_id: req.params.roleId,
    })
      .populate("permission_id")
      .sort({ createdAt: -1 });

    const permissions = rolePermissions
      .map((item) => item.permission_id)
      .filter(Boolean);

    res.status(200).json({
      message: "Role permissions retrieved successfully",
      data: {
        role_id: role._id,
        role_name: role.name,
        permissions,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getByPermission = async (req, res, next) => {
  try {
    const permission = await Permission.findById(
      req.params.permissionId
    );

    if (!permission) {
      return res.status(404).json({
        message: "Permission not found",
      });
    }

    const rolePermissions = await RolePermission.find({
      permission_id: req.params.permissionId,
    })
      .populate("role_id")
      .sort({ createdAt: -1 });

    const roles = rolePermissions
      .map((item) => item.role_id)
      .filter(Boolean);

    res.status(200).json({
      message: "Permission roles retrieved successfully",
      data: {
        permission_id: permission._id,
        permission_name: permission.name,
        roles,
      },
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const rolePermission =
      await RolePermission.findByIdAndDelete(
        req.params.id
      );

    if (!rolePermission) {
      return res.status(404).json({
        message: "Role permission not found",
      });
    }

    res.status(200).json({
      message: "Permission removed from role successfully",
      data: {
        id: rolePermission._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  getByRole,
  getByPermission,
  remove,
};