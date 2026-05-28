const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
   patient: {
      type: String,
      required: true
   },
   doctor: {
      type: String,
      required: true
   },
   date: {
      type: String,
      required: true
   },
   time: {
      type: String,
      required: true
   },
   status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled", "no-show"],
      default: "scheduled"
   }
});

module.exports = mongoose.model("Appointment", appointmentSchema);