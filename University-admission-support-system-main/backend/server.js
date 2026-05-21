const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const ResultDocuments = require("./models/ResultDocuments");
const University = require("./models/University");

/* Routes */
const chatRoutes = require("./routes/chatRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const connectDB = require("./db");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());

/* ================= DATABASE ================= */

connectDB();

/* ================= ROUTES ================= */

app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

/* ================= MULTER SETUP ================= */

const uploadPath = path.join(__dirname, "uploads");

/* Create uploads folder automatically */
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {

    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  }
});

const upload = multer({

  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg"
    ];

    if (allowedTypes.includes(file.mimetype)) {

      cb(null, true);

    } else {

      cb(
        new Error("Only PDF and image files allowed"),
        false
      );
    }
  }
});

/* ================= STATIC FILES ================= */

app.use(
  "/uploads",
  express.static(uploadPath)
);

/* ================= GET UNIVERSITIES ================= */

app.get("/universities", async (req, res) => {

  try {

    const data = await University.find();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
});

/* ================= ENTRY TEST RULE ================= */

app.post("/get-entry-test-rule", async (req, res) => {

  try {

    const {
      selectedUni,
      department
    } = req.body;

    if (!selectedUni || !department) {

      return res.status(400).json({
        error: "Missing data"
      });
    }

    const uni = await University.findOne({
      name: selectedUni
    });

    if (!uni) {

      return res.status(404).json({
        error: "University not found"
      });
    }

    const dept = uni.departments.find(
      (d) => d.name === department
    );

    if (!dept) {

      return res.status(404).json({
        error: "Department not found"
      });
    }

    res.json({
      entryTestRequired:
        dept.meritFormula.entryTestRequired
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

/* ================= CHECK ELIGIBILITY ================= */

app.post("/check-eligibility", async (req, res) => {

  try {

    const {
      selectedUni,
      department,
      course,
      marks
    } = req.body;

    if (
      !selectedUni ||
      !department ||
      !course ||
      !marks
    ) {

      return res.json({
        error: "Please fill all fields"
      });
    }

    const matricObtained =
      parseFloat(marks.matricObtained) || 0;

    const matricTotal =
      parseFloat(marks.matricTotal) || 0;

    let interObtained =
      parseFloat(marks.interObtained) || 0;

    const interTotal =
      parseFloat(marks.interTotal) || 0;

    const entryObtained =
      parseFloat(marks.entryObtained) || 0;

    const entryTotal =
      parseFloat(marks.entryTotal) || 0;

    const hafizQuran =
      marks.hafizQuran || false;

    const interPassingYear =
      parseInt(marks.interPassingYear) || 2025;

    if (
      matricObtained > matricTotal ||
      interObtained > interTotal ||
      entryObtained > entryTotal
    ) {

      return res.json({
        error:
          "Obtained marks cannot be greater than total marks"
      });
    }

    const currentYear = 2025;

    const gapYears =
      currentYear - interPassingYear;

    if (gapYears >= 1) {

      interObtained =
        interObtained - (gapYears * 10);

      if (interObtained < 0) {
        interObtained = 0;
      }
    }

    const matric =
      (matricObtained / matricTotal) * 100;

    const inter =
      (interObtained / interTotal) * 100;

    const matricEqualized =
      matric * 11;

    const interEqualized =
      inter * 11;

    const entryTest =
      entryTotal > 0
        ? (entryObtained / entryTotal) * 100
        : 0;

    const uni = await University.findOne({
      name: selectedUni
    });

    if (!uni) {

      return res.json({
        error: "University not found"
      });
    }

    const dept = uni.departments.find(
      (d) => d.name === department
    );

    if (!dept) {

      return res.json({
        error: "Department not found"
      });
    }

    const program = dept.programs?.find(
      (p) =>
        p.title === course ||
        p.title?.toLowerCase().includes(course.toLowerCase()) ||
        course?.toLowerCase().includes(p.title?.toLowerCase())
    );

    const requiredDegree =
      program?.requiredDegree ||
      "Any Intermediate";

    const formula = dept.meritFormula;

    if (
      formula.entryTestRequired &&
      entryObtained === 0
    ) {

      return res.json({
        error: "Entry test marks required"
      });
    }

    let merit;
    let additionalMarks = 0;

    if (hafizQuran) {
      additionalMarks = 20;
    }

    if (formula.formulaType === "pu") {

      const academic =
        (
          (
            (matricObtained / 4) +
            interObtained +
            additionalMarks
          )
          /
          (
            (matricTotal / 4) +
            interTotal
          )
        ) * 75;

      const entryPart =
        (entryObtained / entryTotal) * 25;

      merit = academic + entryPart;

    } else if (
      formula.formulaType === "uos"
    ) {

      merit =
        (formula.matric * matricEqualized) +
        (formula.inter * interEqualized) +
        additionalMarks;

    } else if (
      formula.formulaType === "uos-engineering"
    ) {

      merit =
        (formula.matric * matricEqualized) +
        (formula.inter * interEqualized) +
        (formula.entryTest * entryTest) +
        additionalMarks;

    } else {

      if (formula.entryTestRequired) {

        merit =
          (formula.matric * matricEqualized) +
          (formula.inter * interEqualized) +
          (formula.entryTest * entryTest) +
          additionalMarks;

      } else {

        merit =
          (formula.matric * matricEqualized) +
          (formula.inter * interEqualized) +
          additionalMarks;
      }
    }

    let finalMeritForComparison;

    if (formula.formulaType === "pu") {
      finalMeritForComparison = merit;
    } else {
      finalMeritForComparison = merit / 11;
    }

    const eligible =
      finalMeritForComparison >= formula.requiredMerit;

    res.json({

      merit:
        finalMeritForComparison.toFixed(2),

      eligible,

      entryTestRequired:
        formula.entryTestRequired,

      cutoffHistory:
        dept.cutoffHistory,

      similarPrograms:
        dept.similarPrograms,

      applyLink:
        dept.applyLink,

      requiredDegree
    });

  } catch (error) {

    console.error(error);

    res.json({
      error:
        "Server error: " + error.message
    });
  }
});

/* ================= UPLOAD RESULTS ================= */

app.post(

  "/uploadResults",

  upload.fields([
    { name: "matric", maxCount: 1 },
    { name: "inter", maxCount: 1 },
    { name: "EntryTest", maxCount: 1 }
  ]),

  async (req, res) => {

    try {

      if (
        !req.files.matric ||
        !req.files.inter
      ) {

        return res.status(400).json({
          error:
            "Matric and Inter files required"
        });
      }

      const newDocument =
        new ResultDocuments({

          userEmail:
            req.body.userEmail,

          matric:
            req.files.matric
              ? req.files.matric[0].path
              : "",

          inter:
            req.files.inter
              ? req.files.inter[0].path
              : "",

          entryTest:
            req.files.EntryTest
              ? req.files.EntryTest[0].path
              : ""
        });

      await newDocument.save();

      res.json({
        message:
          "Results Uploaded Successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Upload failed"
      });
    }
  }
);

/* ================= RECOMMEND UNIVERSITIES ================= */

app.post(
  "/recommend-universities",

  async (req, res) => {

    try {

      const {
        city,
        degree,
        type,
        hostel,
        maxFee
      } = req.body;

      const universities =
        await University.find();

      let recommendations = [];

      universities.forEach((uni) => {

        let score = 0;

        /* CITY SCORE */

        if (
          uni.city?.toLowerCase() ===
          city.toLowerCase()
        ) {

          score += 20;
        }

        /* TYPE SCORE */

        if (
          uni.type?.toLowerCase() ===
          type.toLowerCase()
        ) {

          score += 20;
        }

        /* HOSTEL SCORE */

        if (
          hostel === false ||
          uni.hostel === true
        ) {

          score += 10;
        }

        /* FEE SCORE */

        if (
          parseInt(uni.averageFee) <=
          parseInt(maxFee)
        ) {

          score += 30;
        }

        /* DEGREE SCORE */

        const degreeFound =
          uni.departments?.some((dept) =>
            dept.courses?.some((course) =>
              course.toLowerCase().includes(
                degree.toLowerCase()
              )
            )
          );

        if (degreeFound) {

          score += 20;
        }

        recommendations.push({

          name: uni.name,

          city: uni.city,

          type: uni.type,

          averageFee: uni.averageFee,

          hostel: uni.hostel,

          matchScore: score
        });
      });

      recommendations.sort(
        (a, b) =>
          b.matchScore - a.matchScore
      );

      res.json(
        recommendations.slice(0, 10)
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });
    }
  }
);

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );
});