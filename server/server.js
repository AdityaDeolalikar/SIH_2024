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

// Import middleware
const authMiddleware = require("./middleware/auth");

// Import Achievement model
const Achievement = require("./models/Achievement");
const authRouter = require("./routes/auth");
const achievementsRouter = require("./routes/achievements");
const institutionsRouter = require("./routes/institutions");

// Public routes
app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Protected routes - add auth middleware
app.use("/api/achievements", authMiddleware, achievementsRouter);
app.use("/api/institutions", institutionsRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
