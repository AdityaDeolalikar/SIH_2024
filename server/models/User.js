const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUID: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["student", "faculty", "administrator"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add other fields as needed
});

module.exports = mongoose.model("User", userSchema);
