const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
   patient:String,
   doctor:String,
   date:String,
   time:String,
   status:{
      type:String,
      default:"scheduled"
   }
});

module.exports = mongoose.model("Appointment", appointmentSchema);