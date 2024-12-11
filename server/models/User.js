const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Common Fields
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["student", "faculty", "administrator"],
    required: true,
  },

  // Student Specific Fields
  studentId: {
    type: String,
    required: function () {
      return this.userType === "student";
    },
  },
  programName: {
    type: String,
    required: function () {
      return this.userType === "student";
    },
  },
  yearSemester: {
    type: String,
    required: function () {
      return this.userType === "student";
    },
  },
  department: {
    type: String,
    required: function () {
      return this.userType === "student" || this.userType === "faculty";
    },
  },
  skills: {
    type: String,
    required: function () {
      return this.userType === "student";
    },
  },
  instituteName: {
    type: String,
    required: function () {
      return this.userType === "student";
    },
  },
  dateOfBirth: {
    type: Date,
    required: function () {
      return this.userType === "student";
    },
  },

  // Faculty Specific Fields
  employeeId: {
    type: String,
    required: function () {
      return this.userType === "faculty";
    },
  },
  designation: {
    type: String,
    required: function () {
      return this.userType === "faculty";
    },
  },
  educationalQualification: {
    type: String,
    required: function () {
      return this.userType === "faculty";
    },
  },
  specialization: {
    type: String,
    required: function () {
      return this.userType === "faculty";
    },
  },
  experience: {
    type: Number,
    required: function () {
      return this.userType === "faculty";
    },
  },

  // Optional Fields
  linkedinProfile: String,
  portfolio: String,
  emergencyContact: String,
  innovationInterests: String,

  // System Fields
  firebaseUID: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
