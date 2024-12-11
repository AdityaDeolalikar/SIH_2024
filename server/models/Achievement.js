const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    innovationIndicator: {
      type: String,
      enum: ["Patent", "Research Paper", "Project", "Startup"],
      required: true,
    },
    Founder: {
      type: String,
      required: true,
    },
    publisherName: String,
    Date: {
      type: Date,
      required: true,
    },
    mentorDetails: String,
    Domain: {
      type: String,
      enum: ["AI/ML", "Web Development", "IoT", "Blockchain", "Other"],
      required: true,
    },
    nameOfPlatform: String,
    document: String,
    currentStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    institution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);
