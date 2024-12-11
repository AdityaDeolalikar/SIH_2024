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
    let user = await User.findOne({ firebaseUID });

    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        firebaseUID,
        phoneNumber,
        role,
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
      email,
      password,
      userType,
      // ... other fields from req.body
    } = req.body;

    // Check if user already exists
    const userRecord = await admin
      .auth()
      .getUserByEmail(email)
      .catch(() => null);
    if (userRecord) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in Firebase Auth
    const newUser = await admin.auth().createUser({
      email,
      password: hashedPassword,
      displayName: fullName,
    });

    // Store user data in Firestore
    const userData = {
      uid: newUser.uid,
      fullName,
      email,
      userType,
      // ... add all other fields
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await admin.firestore().collection("users").doc(newUser.uid).set(userData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      uid: newUser.uid,
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

module.exports = authRouter;
