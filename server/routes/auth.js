const express = require("express");
const authRouter = express.Router();
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Initialize Firebase Admin
const serviceAccount = require("../firebase-service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

authRouter.post("/firebase-login", async (req, res) => {
  try {
    // Get the ID token from the Authorization header
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { firebaseUID, role, phoneNumber } = req.body;

    // Verify that the UID from token matches the one from request
    if (decodedToken.uid !== firebaseUID) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Find or create user in your database
    let user = await User.findOne({ firebaseUID }).populate("institute");

    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        firebaseUID,
        phoneNumber,
        role,
        institute:
          role === "student" || role === "faculty"
            ? req.body.institute
            : undefined,
        // Add any other fields you need
      });
      await user.save();
    } else {
      // Update existing user's role if needed
      user.role = role;
      await user.save();
    }

    // Generate JWT token for your backend
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        firebaseUID: user.firebaseUID,
        institution: user.institute,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return user data and token
    res.json({
      token,
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        role: user.role,
        ...user.toObject(),
        // Add other user fields you want to return
      },
    });
  } catch (error) {
    console.error("Firebase login error:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      gender,
      address,
      city,
      state,
      userType,
      firebaseUID,
      // Student specific fields
      studentId,
      programName,
      yearSemester,
      department,
      skills,
      institute,
      dateOfBirth,
      // Faculty specific fields
      employeeId,
      designation,
      educationalQualification,
      specialization,
      experience,
      // Optional fields
      linkedinProfile,
      portfolio,
      emergencyContact,
      innovationInterests,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user in MongoDB
    const userData = {
      fullName,
      phoneNumber,
      gender,
      address,
      city,
      state,
      userType,
      firebaseUID,
      institute:
        userType === "student" || userType === "faculty"
          ? req.body.institute
          : undefined,
      // ... add other fields
    };

    // Add conditional fields based on user type
    if (userType === "student") {
      Object.assign(userData, {
        studentId,
        programName,
        yearSemester,
        department,
        skills,
        institute,
        dateOfBirth,
      });
    } else if (userType === "faculty") {
      Object.assign(userData, {
        employeeId,
        designation,
        department,
        educationalQualification,
        specialization,
        experience,
      });
    }

    // Add optional fields if provided
    if (linkedinProfile) userData.linkedinProfile = linkedinProfile;
    if (portfolio) userData.portfolio = portfolio;
    if (emergencyContact) userData.emergencyContact = emergencyContact;
    if (innovationInterests) userData.innovationInterests = innovationInterests;

    const mongoUser = new User(userData);
    await mongoUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      uid: firebaseUID,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
});

authRouter.post("/check-user", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Check if user exists in MongoDB
    const user = await User.findOne({ phoneNumber }).populate("institute");

    res.json({
      exists: !!user,
      userType: user?.userType,
    });
  } catch (error) {
    console.error("Check user error:", error);
    res.status(500).json({
      success: false,
      message: "Error checking user",
      error: error.message,
    });
  }
});

module.exports = authRouter;
