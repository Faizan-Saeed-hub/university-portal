const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({

  userEmail: {
    type: String,
    required: true
  },

  matric: {
    type: String,
    required: true
  },

  inter: {
    type: String,
    required: true
  },

  entryTest: {
    type: String,
    default: ""
  },

  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports =
  mongoose.model(
    "ResultDocuments",
    resultSchema
  );