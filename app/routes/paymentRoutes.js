const express = require("express");

const router = express.Router();

const {
  createPayment,
  verifyPayment,
} = require("../controllers/paymentController");

router.post("/", createPayment);

router.post("/verify", verifyPayment);

module.exports = router;