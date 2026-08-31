const express = require("express");

const router = express.Router();

const ProductSizeController =
  require("../controllers/ProductSizeController");

router.post(
  "/",
  ProductSizeController.create
);

router.get(
  "/",
  ProductSizeController.getAll
);

router.get(
  "/:id",
  ProductSizeController.getById
);

router.put(
  "/:id",
  ProductSizeController.update
);

router.delete(
  "/:id",
  ProductSizeController.delete
);

module.exports = router;