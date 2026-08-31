const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const controller = require("../controllers/productImageController");

router.get(
  "/",
  controller.getAllImages
);

router.get(
  "/product/:productId",
  controller.getImagesByProduct
);

router.get(
  "/:id",
  controller.getImageById
);

router.post(
  "/",
  upload.single("image"),
  controller.createImage
);

router.put(
  "/:id",
  upload.single("image"),
  controller.updateImage
);

router.delete(
  "/:id",
  controller.deleteImage
);

module.exports = router;