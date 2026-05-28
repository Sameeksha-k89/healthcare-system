const express = require("express");
const router = express.Router();
const EMR = require("../models/EMR");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async(req,res)=>{
   try{
      const emr = await EMR.create(req.body);

      res.status(201).json(emr);

   }catch(err){
      res.status(500).json({message:err.message});
   }
});

router.get("/", auth, async (req, res) => {
  try {
    const emrs = await EMR.find();

    let result;

    if (req.user.role === "admin") {
      // Admin can see everything
      result = emrs;
    } 
    else if (req.user.role === "doctor") {
      // Doctor can see all assigned patients (basic version)
      result = emrs.filter(emr => emr.doctor === req.user.name);
    } 
    else {
      // Patient can only see own records
      result = emrs.filter(emr => emr.patient === req.user.name);
    }

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id", auth, async (req, res) => {
  try {

    const emr = await EMR.findById(req.params.id);

    if (!emr) {
      return res.status(404).json({ message: "EMR not found" });
    }

    // update fields
    Object.assign(emr, req.body);

    // audit log (REQUIRED FEATURE)
    emr.auditLogs.push({
      action: "Updated EMR",
      updatedBy: req.user.name,
      updatedAt: new Date()
    });

    await emr.save();

    res.json(emr);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete("/:id", auth, async (req, res) => {

   try {

      await EMR.findByIdAndDelete(req.params.id);

      res.json({
         message: "Deleted successfully"
      });

   } catch (err) {

      res.status(500).json({
         message: err.message
      });

   }

});

module.exports = router;