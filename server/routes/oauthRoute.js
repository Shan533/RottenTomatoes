const User = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

// Register with Google
router.post("/register", async (req, res) => {
  try {
    const { token, name, password } = req.body;
    if (!token || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (token, name, password)",
      });
    }

    // 1. Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token, // <-- the token from frontend
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google token",
      });
    }
    // 2. Extract user info from Google
    const { email, sub: googleId, picture } = payload;
    // "sub" is the unique Google user ID

    // 3. Check if user with that email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists, please log in instead",
      });
    }

    // 4. Hash the user-chosen password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create the new user in MongoDB
    const newUser = await User.create({
      name,
      email,
      googleId,
      password: hashedPassword,
      profilePic: picture, // from Google, optional
    });

    // 6. Generate a JWT for immediate login
    const tokenJWT = jwt.sign({ userId: newUser._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully with Google",
      data: {
        token: tokenJWT,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          googleId: newUser.googleId,
        },
      },
    });
  } catch (error) {
    console.error("Google Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
});

// Login with Google
router.post("/login", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Missing Google token",
      });
    }

    // 1. Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google token",
      });
    }

    // 2. Extract user info from Google
    const { email, sub: googleId, name, picture } = payload;

    // 3. Check if user exists in the DB
    let user = await User.findOne({ email });
    if (!user) {
      // Option A: Auto-create user with no password
      //   (User can set a password later if needed)
      user = await User.create({
        name: name || email,
        email,
        googleId,
        profilePic: picture,
      });
    }

    if (!user.isActive) {
      return res
        .status(403)
        .json({ success: false, message: "User is not active" });
    }

    // 4. Generate a JWT
    const tokenJWT = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully with Google",
      data: {
        token: tokenJWT,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          googleId: user.googleId,
        },
      },
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
});

module.exports = router;
