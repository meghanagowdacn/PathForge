

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { db } = require("./config/firebase");
const userRoutes = require("./routes/userroutes");
const authRoutes = require("./routes/authroutes");
const authenticateUser = require("./middleware/authmiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


// Backend test
app.get("/", (req, res) => {
  res.json({
    message: "PathForge backend is running successfully!",
  });
});

// Firebase / Firestore test
app.get("/api/firebase-test", async (req, res) => {
  try {
    await db.collection("_connection_test").limit(1).get();

    res.json({
      success: true,
      message: "Backend is successfully connected to Firebase Firestore!",
    });
  } catch (error) {
    console.error("Firebase connection error:", error);

    res.status(500).json({
      success: false,
      message: "Firebase connection failed",
      error: error.message,
    });
  }
});

// Protected authentication test
app.get("/api/protected-test", authenticateUser, (req, res) => {
  res.json({
    success: true,
    message: "Authentication successful! Backend recognizes the logged-in user.",
    user: {
      uid: req.user.uid,
      email: req.user.email,
    },
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`PathForge backend running on http://localhost:${PORT}`);
});