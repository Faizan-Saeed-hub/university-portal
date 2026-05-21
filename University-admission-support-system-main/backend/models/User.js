const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Student",
    },
    merit: {
      type: Number,
      default: null,
    },
    uploadedDocuments: {
      type: Number,
      default: 0,
    },
    appliedUniversities: {
      type: Number,
      default: 0,
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
