const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
   patient:String,
   doctor:String,
   medicines:[String],
   dosage:String,
   duration:String
});

module.exports = mongoose.model(
   "Prescription",
   prescriptionSchema
);