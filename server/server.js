const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import Achievement model
const Achievement = require("./models/Achievement");
const authRouter = require("./routes/auth");

// Get all achievements route with filters
app.get("/api/achievements", async (req, res) => {
  try {
    const { innovationIndicator, domain, currentStatus, date } = req.query;

    // Build filter object
    const filter = {};

    if (innovationIndicator) {
      filter.innovationIndicator = innovationIndicator;
    }

    if (domain) {
      filter.Domain = domain; // Note: Using 'Domain' to match the schema
    }

    if (currentStatus) {
      filter.currentStatus = currentStatus;
    }

    if (date) {
      // For date filtering, assuming you want to match the exact date
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      filter.Date = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    console.log("Applied filters:", filter, req.query); // Debug log

    const achievements = await Achievement.find(filter).sort({ Date: -1 });

    console.log("Achievements fetched:", achievements.length);
    res.json(achievements);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res
      .status(500)
      .json({ message: "Error fetching achievements", error: error.message });
  }
});
app.use("/api/auth", authRouter);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
