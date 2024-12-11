const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

router.get('/', async (req, res) => {
  try {
    const {
      innovationIndicator,
      domain,
      currentStatus,
      date
    } = req.query;

    // Build filter object
    const filter = {};

    if (innovationIndicator) {
      filter.innovationIndicator = innovationIndicator;
    }

    if (domain) {
      filter.Domain = domain;
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
        $lt: endDate
      };
    }

    const achievements = await Achievement.find(filter)
      .sort({ Date: -1 }) // Sort by date in descending order
      .exec();

    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ message: 'Error fetching achievements', error: error.message });
  }
});

module.exports = router; 