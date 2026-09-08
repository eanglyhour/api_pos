const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    check_in: {
      type: Date,
      default: null,
    },

    check_out: {
      type: Date,
      default: null,
    },

    check_in_latitude: {
      type: Number,
      default: null,
    },

    check_in_longitude: {
      type: Number,
      default: null,
    },

    check_out_latitude: {
      type: Number,
      default: null,
    },

    check_out_longitude: {
      type: Number,
      default: null,
    },

    distance: {
      type: Number,
      default: null,
    },

    status: {
      type: String,
      enum: ["present", "late", "absent"],
      default: "present",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);