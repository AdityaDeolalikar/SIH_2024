const express = require("express");
const achievementsRouter = express.Router();
const Achievement = require("../models/Achievement");
const User = require("../models/User");

achievementsRouter.get("/", async (req, res) => {
  try {
    const { innovationIndicator, domain, currentStatus, date, institution } =
      req.query;

    // Build filter object
    const filter = {};

    if (innovationIndicator) {
      filter.innovationIndicator = innovationIndicator;
    }

    if (institution) {
      filter.institution = institution;
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

// Add new POST route for submitting achievements
achievementsRouter.post("/", async (req, res) => {
  try {
    const institution = req?.user?.institution;
    
    // Validate required fields based on category
    if (req.body.category === "Non Technical") {
      if (!req.body.innovationTitle || !req.body.description || 
          !req.body.applicationImpact || !req.body.innovatorNames) {
        return res.status(400).json({ 
          message: "Missing required fields for non-technical achievement" 
        });
      }
    }

    const achievement = new Achievement({
      // Common fields
      category: req.body.category,
      Date: req.body.Date,
      institution,
      currentStatus: "Pending",
      document: req.body.document,

      // Technical Achievement Fields
      ...(req.body.category === "Technical" && {
        innovationIndicator: req.body.innovationIndicator,
        Founder: req.body.Founder,
        Domain: req.body.Domain,
        publisherName: req.body.publisherName,
        mentorDetails: req.body.mentorDetails,
        nameOfPlatform: req.body.nameOfPlatform,
      }),

      // Non-Technical Achievement Fields
      ...(req.body.category === "Non Technical" && {
        innovationTitle: req.body.innovationTitle,
        description: req.body.description,
        applicationImpact: req.body.applicationImpact,
        innovatorNames: Array.isArray(req.body.innovatorNames) 
          ? req.body.innovatorNames 
          : [req.body.innovatorNames],
        achievementType: req.body.achievementType
      })
    });

    const savedAchievement = await achievement.save();
    res.status(201).json(savedAchievement);
  } catch (error) {
    console.error("Error creating achievement:", error);
    res.status(500).json({ 
      message: "Error creating achievement", 
      error: error.message 
    });
  }
});

// Get all pending achievements
// achievementsRouter.get("/achievements", async (req, res) => {
//   try {
//     const { currentStatus } = req.query;
//     const achievements = await Achievement.find({ currentStatus });
//     res.json(achievements);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Update achievement status
achievementsRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { currentStatus } = req.body;

    const achievement = await Achievement.findByIdAndUpdate(
      id,
      { currentStatus },
      { new: true }
    );

    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = achievementsRouter;
