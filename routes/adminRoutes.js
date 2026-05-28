const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Appointment = require("../models/Appointment");
const auth = require("../middleware/authMiddleware");


// ---------------------------
// ADMIN CHECK
// ---------------------------
const isAdmin = (req) => req.user.role === "admin";

const adminOnly = (req, res) => {
  if (!isAdmin(req)) {
    res.status(403).json({ message: "Access denied" });
    return false;
  }
  return true;
};


// ---------------------------
// GET ALL USERS
// ---------------------------
router.get("/users", auth, async (req, res) => {
  try {
    if (!adminOnly(req, res)) return;

    const users = await User.find();
    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ---------------------------
// BLOCK USER
// ---------------------------
router.put("/block/:id", auth, async (req, res) => {
  try {
    if (!adminOnly(req, res)) return;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.blocked = true;
    await user.save();

    res.json({ message: "User blocked", user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ---------------------------
// UNBLOCK USER
// ---------------------------
router.put("/unblock/:id", auth, async (req, res) => {
  try {
    if (!adminOnly(req, res)) return;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.blocked = false;
    await user.save();

    res.json({ message: "User unblocked", user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ---------------------------
// FULL SYSTEM REPORT (FINAL)
// ---------------------------
router.get("/reports", auth, async (req, res) => {
  try {
    if (!adminOnly(req, res)) return;

    const users = {
      total: await User.countDocuments(),
      patients: await User.countDocuments({ role: "patient" }),
      doctors: await User.countDocuments({ role: "doctor" })
    };

    const appointments = {
      total: await Appointment.countDocuments(),
      scheduled: await Appointment.countDocuments({ status: "scheduled" }),
      completed: await Appointment.countDocuments({ status: "completed" }),
      cancelled: await Appointment.countDocuments({ status: "cancelled" }),
      noShow: await Appointment.countDocuments({ status: "no-show" })
    };

    res.json({ users, appointments });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ---------------------------
// EXPORT
// ---------------------------
module.exports = router;