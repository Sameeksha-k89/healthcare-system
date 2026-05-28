const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req,res)=>{
   res.send("API Running");
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/emr", require("./routes/emrRoutes"));
app.use("/api/appointments",require("./routes/appointmentRoutes"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));
const doctorRoutes = require("./routes/doctorRoutes");

app.use("/api/doctors", doctorRoutes);
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/admin", adminRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
   console.log(`Server running on ${PORT}`);
});