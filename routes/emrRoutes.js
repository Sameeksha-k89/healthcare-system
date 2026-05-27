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

router.get("/:id", auth, async(req,res)=>{
   const emr = await EMR.findById(req.params.id);

   res.json(emr);
});

module.exports = router;