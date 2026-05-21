const express = require("express");
const router = express.Router();

const University = require("../models/University");
const User = require("../models/User");


// ================= USERS =================

// GET ALL USERS
router.get("/users", async (req, res) => {

  const users = await User.find();

  res.json(users);
});


// DELETE USER
router.delete("/users/:id", async (req, res) => {

  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "User Deleted"
  });
});



// ================= UNIVERSITIES =================

// GET ALL UNIVERSITIES
router.get("/universities", async (req, res) => {

  const universities = await University.find();

  res.json(universities);
});


// ADD UNIVERSITY
router.post("/universities", async (req, res) => {

  const newUniversity = new University(req.body);

  await newUniversity.save();

  res.json(newUniversity);
});


// UPDATE UNIVERSITY
router.put("/universities/:id", async (req, res) => {

  const updatedUniversity =
    await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(updatedUniversity);
});


// DELETE UNIVERSITY
router.delete("/universities/:id", async (req, res) => {

  await University.findByIdAndDelete(req.params.id);

  res.json({
    message: "University Deleted"
  });
});


module.exports = router;