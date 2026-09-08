const Attendance = require("../models/Attendance");
const calculateDistance = require("../utils/distance");
//11.569527 , 104.889326       rupp
//11.567525 , 104.827060       home at pp
const OFFICE_LOCATION = {
    latitude: 11.567525,
    longitude: 104.827060,
    // latitude: 11.569527,
    // longitude: 104.889326,
};

const ALLOWED_RADIUS = 200;

exports.checkIn = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        if (latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                success: false,
                message: "Latitude and Longitude are required",
            });
        }

        const distance = calculateDistance(
            latitude,
            longitude,
            OFFICE_LOCATION.latitude,
            OFFICE_LOCATION.longitude
        );

        // Check allowed radius
        if (distance > ALLOWED_RADIUS) {
            return res.status(403).json({
                success: false,
                message: "You are outside attendance area",
                distance: `${Math.round(distance)} meters`,
                allowed_radius: `${ALLOWED_RADIUS} meters`,
            });
        }

        // Get today's date range
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Check if already checked in today
        const existingAttendance = await Attendance.findOne({
            check_in: {
                $gte: today,
                $lt: tomorrow,
            },
        });

        if (existingAttendance) {
            return res.status(400).json({
                success: false,
                message: "Attendance already checked in today",
            });
        }

        // Create attendance
        const attendance = await Attendance.create({
            check_in: new Date(),

            check_in_latitude: latitude,

            check_in_longitude: longitude,

            distance: Math.round(distance),

            status: "present",
        });

        return res.status(201).json({
            success: true,
            message: "Check-in successful",
            data: attendance,
        });
    } catch (error) {
        console.error("Check-in error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Check Out
 */
exports.checkOut = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        // Validate location
        if (latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                success: false,
                message: "Latitude and Longitude are required",
            });
        }

        // Get today's date range
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Find today's attendance
        const attendance = await Attendance.findOne({
            check_in: {
                $gte: today,
                $lt: tomorrow,
            },
        });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "You have not checked in yet",
            });
        }

        // Check if already checked out
        if (attendance.check_out) {
            return res.status(400).json({
                success: false,
                message: "You already checked out",
            });
        }

        // Calculate checkout distance
        const distance = calculateDistance(
            latitude,
            longitude,
            OFFICE_LOCATION.latitude,
            OFFICE_LOCATION.longitude
        );

        // Check allowed radius
        if (distance > ALLOWED_RADIUS) {
            return res.status(403).json({
                success: false,
                message: "You are outside attendance area",
                distance: `${Math.round(distance)} meters`,
                allowed_radius: `${ALLOWED_RADIUS} meters`,
            });
        }

        // Update checkout
        attendance.check_out = new Date();

        attendance.check_out_latitude = latitude;

        attendance.check_out_longitude = longitude;

        await attendance.save();

        return res.json({
            success: true,
            message: "Check-out successful",
            data: attendance,
        });
    } catch (error) {
        console.error("Check-out error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Attendance retrieved successfully",
      count: attendances.length,
      data: attendances,
    });
  } catch (error) {
    console.error("Get attendance error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};