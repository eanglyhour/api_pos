const express = require("express");

const controller = require("../controllers/rolePermissionController");

const router = express.Router();

router.get("/",controller.getAll);

router.get("/:id",controller.getById);

router.get("/role/:roleId",controller.getByRole);

router.get("/permission/:permissionId",controller.getByPermission);

router.post("/",controller.create);

router.delete("/:id",controller.remove);

module.exports = router;