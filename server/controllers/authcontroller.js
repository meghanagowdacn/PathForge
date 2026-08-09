
const { auth, db } = require("../config/firebase");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Create Firebase Authentication user
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Save additional user information in Firestore
    await db.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      name,
      email,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        uid: userRecord.uid,
        name,
        email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
};

