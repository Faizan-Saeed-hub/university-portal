const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Account already exists with this email" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: "Student",
      merit: null,
      uploadedDocuments: 0,
      appliedUniversities: 0,
      profileImage: null
    });

    await newUser.save();
    
    // In a real app we'd hash the password and return a JWT. 
    // Here we just return success so the frontend can log them in.
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Email, password, and role are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No account found with this email" });
    }

    // Role check
    // Admins can log in as either Admin or Student. Students can only log in as Student.
    if (role === "Admin" && user.role !== "Admin") {
      return res.status(401).json({ error: "This account is not an Admin account." });
    }

    // Direct password match (again, normally hashed)
    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ================= GET USER =================
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ================= UPDATE USER =================
router.put("/:email", async (req, res) => {
  try {
    // Only allow updating certain fields for security
    const { merit, uploadedDocuments, appliedUniversities, profileImage } = req.body;
    
    const updateData = {};
    if (merit !== undefined) updateData.merit = merit;
    if (uploadedDocuments !== undefined) updateData.uploadedDocuments = uploadedDocuments;
    if (appliedUniversities !== undefined) updateData.appliedUniversities = appliedUniversities;
    if (profileImage !== undefined) updateData.profileImage = profileImage;

    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { $set: updateData },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
