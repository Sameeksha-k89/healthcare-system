const mongoose = require("mongoose");

const emrSchema = new mongoose.Schema({
   patient:String,
   diagnosis:String,
   medications:String,
   notes:String
});

module.exports = mongoose.model("EMR", emrSchema);