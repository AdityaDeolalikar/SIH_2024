const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Technical", "Non Technical"],
      required: true,
    },
    // Technical Achievement Fields
    innovationIndicator: {
      type: String,
      enum: ["Patent", "Research Paper", "Project", "Startup"],
      required: function () {
        return this.category === "Technical";
      },
    },
    Founder: {
      type: String,
      required: function () {
        return this.category === "Technical";
      },
    },
    publisherName: String,
    mentorDetails: String,
    Domain: {
      type: String,
      enum: ["AI/ML", "Web Development", "IoT", "Blockchain", "Other"],
      required: function () {
        return this.category === "Technical";
      },
    },
    nameOfPlatform: String,

    // Non-Technical Achievement Fields
    innovationTitle: {
      type: String,
      required: function() {
        return this.category === "Non Technical";
      }
    },
    description: {
      type: String,
      required: function() {
        return this.category === "Non Technical";
      }
    },
    applicationImpact: {
      type: String,
      required: function() {
        return this.category === "Non Technical";
      }
    },
    innovatorNames: {
      type: [String],
      required: function() {
        return this.category === "Non Technical";
      }
    },
    achievementType: {
      type: String,
      enum: ["Cultural", "Sports", "Social Work", "Leadership", "Other"],
      required: function() {
        return this.category === "Non Technical";
      }
    },

    // Common Fields
    Date: {
      type: Date,
      required: true,
    },
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
