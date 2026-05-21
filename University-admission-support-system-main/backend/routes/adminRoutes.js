const express = require("express");
const router = express.Router();

const University = require("../models/University");
const User = require("../models/User");
const ResultDocuments = require("../models/ResultDocuments");


// ================= USERS =================

// GET ALL USERS
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE USER
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================= UNIVERSITIES =================

// GET ALL UNIVERSITIES
router.get("/universities", async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET SINGLE UNIVERSITY
router.get("/universities/:id", async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) return res.status(404).json({ message: "University not found" });
    res.json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD UNIVERSITY
router.post("/universities", async (req, res) => {
  try {
    const newUniversity = new University(req.body);
    await newUniversity.save();
    res.json(newUniversity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE UNIVERSITY
router.put("/universities/:id", async (req, res) => {
  try {
    const updatedUniversity = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUniversity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE UNIVERSITY
router.delete("/universities/:id", async (req, res) => {
  try {
    await University.findByIdAndDelete(req.params.id);
    res.json({ message: "University Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================= DOCUMENTS =================

// GET ALL DOCUMENTS
router.get("/documents", async (req, res) => {
  try {
    const documents = await ResultDocuments.find().sort({ uploadedAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE DOCUMENT
router.delete("/documents/:id", async (req, res) => {
  try {
    await ResultDocuments.findByIdAndDelete(req.params.id);
    res.json({ message: "Document Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= CREATE ADMIN (MANUAL) =================
router.post("/users/create-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Require the User model since it's not imported in adminRoutes.js yet
    const User = require("../models/User");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "An account already exists with this email" });
    }

    const newAdmin = new User({
      name,
      email,
      password,
      role: "Admin" // Force admin role
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully", user: newAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;