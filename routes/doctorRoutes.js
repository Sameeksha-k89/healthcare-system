const express = require("express");
const router = express.Router();

const Doctor = require("../models/Doctor");
const auth = require("../middleware/authMiddleware");
router.post("/", auth, async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/assign/:id", auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.patients.push(req.body.patientId);

    await doctor.save();

    res.json(doctor);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Doctor deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;