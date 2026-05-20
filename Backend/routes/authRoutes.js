// routes/authRoutes.js

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");
const authenticate = require("../middleware/auth");
const router = express.Router();


// =========================
// AUTH MIDDLEWARE
// =========================


// =========================
// TEST ROUTE
// =========================

router.get("/", (req, res) => {
  res.send("Auth Route Working");
});


// =========================
// REGISTER
// =========================

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      birthday,
      gender,
      image,
    } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Password are required",
      });
    }

    // Check Existing User
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || "",
      address: address || "",
      birthday: birthday || "",
      gender: gender || "",
      image: image || "",
    });

    // Generate Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "careconnect-secret",
      { expiresIn: "7d" }
    );

    // Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        birthday: user.birthday,
        gender: user.gender,
        image: user.image,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// =========================
// LOGIN
// =========================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Find User
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "careconnect-secret",
      { expiresIn: "7d" }
    );

    // Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        birthday: user.birthday,
        gender: user.gender,
        image: user.image,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// =========================
// UPDATE PROFILE
// =========================

router.put("/profile", authenticate, async (req, res) => {
  try {
    const updates = { ...req.body };

    // Prevent password update here
    delete updates.password;

    let updatedUser = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
    });

    if (!updatedUser && updates.email) {
      updatedUser = await User.findOneAndUpdate(
        { email: updates.email.toLowerCase() },
        updates,
        { new: true }
      );
    }

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;