const express = require("express");
const institutionRouter = express.Router();
const Institution = require("../models/Institution");

// Get all institutions
institutionRouter.get("/", async (req, res) => {
  try {
    const institutions = await Institution.find();
    res.json(institutions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = institutionRouter;
