const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    speciality: { type: String, default: "" },
    doctorImage: { type: String, default: "" },
    address: { type: Object, default: {} },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ["booked", "cancelled", "completed"], default: "booked" }
  },
  { timestamps: true }
);



module.exports = mongoose.model("Appointment", appointmentSchema);
