const mongoose = require("mongoose");

const emrSchema = new mongoose.Schema({
  patient: {
    type: String,
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  medications: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },

  // ✅ FIXED: auditLogs INSIDE schema
  auditLogs: [
    {
      action: String,
      updatedBy: String,
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("EMR", emrSchema);