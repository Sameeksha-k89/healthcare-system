const express = require("express");
const router = express.Router();

const Prescription = require("../models/Prescription");
const auth = require("../middleware/authMiddleware");


// CREATE PRESCRIPTION
router.post("/", auth, async (req, res) => {

   try {

      const prescription = await Prescription.create({
         patient: req.body.patient,
         doctor: req.body.doctor,
         medicines: req.body.medicines,
         instructions: req.body.instructions
      });

      res.status(201).json(prescription);

   } catch (err) {

      res.status(500).json({
         message: err.message
      });

   }

});


// GET PRESCRIPTIONS
router.get("/", auth, async (req, res) => {

   try {

      const data = await Prescription.find();

      res.json(data);

   } catch (err) {

      res.status(500).json({
         message: err.message
      });

   }

});

module.exports = router;