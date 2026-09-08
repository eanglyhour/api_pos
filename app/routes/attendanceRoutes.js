const express = require("express");

const router = express.Router();

const {
  checkIn,
  checkOut,
  getAttendances
} = require("../controllers/attendanceController");

// Check in
router.post(
  "/check-in",
  checkIn
);


// Check out
router.post(
  "/check-out",
  checkOut
);

router.get(
  "/",
  getAttendances
);

module.exports = router;