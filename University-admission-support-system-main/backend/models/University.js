const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  name: String,
  departments: [
    {
      name: String,
      fee: String, // department-specific fee (e.g. "43,000 / Semester")
      courses: [String],
      programs: [
        {
          title: String,
          duration: String,
          eligibility: String,
          requiredDegree: String
        }
      ],
      meritFormula: {
        formulaType: String,
        matric: Number,
        inter: Number,
        entryTest: Number,
        academic: Number,
        requiredMerit: Number,
        entryTestRequired: Boolean
      },
      // ================= NEW FIELDS =================
      cutoffHistory: {
        year2024: Number,
        year2023: Number,
        year2022: Number
      },
      similarPrograms: [
        {
          name: String,
          merit: Number
        }
      ],
      applyLink: String,

    }
  ],
  city: String,

  type: String,

  averageFee: Number,

  hostel: Boolean,

  requiredMerit: Number,

  logo: { type: String, default: "" },
  website: { type: String, default: "" }
});

module.exports = mongoose.model("University", universitySchema);