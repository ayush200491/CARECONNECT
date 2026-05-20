const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Appointment = require("../models/Appointment");
const authenticate = require("../middleware/auth");
const router = express.Router();
// =========================
// AUTH MIDDLEWARE
// =========================

//=========================
// TEST ROUTE
// =========================
router.get("/", (req, res) => {
  res.send("Appointments Route Working");
});

// =========================
// BOOK APPOINTMENT API
// =========================

router.post("/book", authenticate, async (req, res) => {
  try {
    const {
      doctorId,
      doctorName,
      speciality,
      doctorImage,
      address,
      date,
      time,
    } = req.body;

    // Validation
    if (!doctorId || !doctorName || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Check Existing Appointment
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      time,
      status: "booked",
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: "Slot already booked",
      });
    }

    // Create Appointment
    const appointment = await Appointment.create({
      userId: req.userId,
      doctorId,
      doctorName,
      speciality: speciality || "",
      doctorImage: doctorImage || "",
      address: address || {},
      date,
      time,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// =========================
// GET USER APPOINTMENTS
// =========================

router.get("/my-appointments", authenticate, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// =========================
// CANCEL APPOINTMENT
// =========================

router.delete("/cancel/:id", authenticate, async (req, res) => {
  try {

    const appointment = await Appointment.findById(req.params.id);

    // Check Appointment Exists
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check Ownership
    if (appointment.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Delete Appointment
    await Appointment.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

// =========================
// EDIT APPOINTMENT
// =========================

router.put("/edit/:id", authenticate, async (req, res) => {
  try {

    const { date, time } = req.body;

    // Validation
    if (!date || !time) {
      return res.status(400).json({
        success: false,
        message: "Date and time are required",
      });
    }

    // Find Appointment
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check Ownership
    if (appointment.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Prevent editing cancelled/completed appointments
    if (
      appointment.status === "cancelled" ||
      appointment.status === "completed"
    ) {
      return res.status(400).json({
        success: false,
        message: "Cannot edit this appointment",
      });
    }

    // Check Slot Availability
    const existingAppointment = await Appointment.findOne({
      doctorId: appointment.doctorId,
      date,
      time,
      status: "booked",
      _id: { $ne: appointment._id },
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: "Slot already booked",
      });
    }

    // Update Only Date & Time
    appointment.date = date;
    appointment.time = time;

    await appointment.save();

    return res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      appointment,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

// =========================
// COMPLETE APPOINTMENT
// =========================

router.put("/complete/:id", authenticate, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = "completed";

    await appointment.save();

    return res.status(200).json({
      success: true,
      message: "Appointment marked as completed",
      appointment,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// =========================
// GET SINGLE APPOINTMENT
// =========================

router.get("/:id", authenticate, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;