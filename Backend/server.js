const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log("ENV PORT:", process.env.PORT);

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.get("/", (req, res) => {
    res.send("API Working");
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});