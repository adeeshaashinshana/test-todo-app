const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Registration
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    console.log("-------registration success--------");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000 && error.keyValue && error.keyValue.username) {
      console.log("-------registration faild--------");
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and sign JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // Set expiry

    console.log("-------login success--------");
    res.json({ token }); // Send token back to the client
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;
