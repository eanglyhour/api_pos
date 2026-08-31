const express = require("express");

const controller = require("../controllers/permissionController");

const router = express.Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.put("/:id", controller.update);

module.exports = router;