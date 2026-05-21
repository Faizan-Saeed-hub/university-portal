const mongoose = require("mongoose");
const connectDB = require("./db");
const User = require("./models/User");

connectDB().then(async () => {
  try {
    // Clear out existing seed accounts to prevent duplication
    await User.deleteMany({ email: { $in: ["admin@admin.com", "student@student.com"] } });

    // Seed default admin account
    const admin = new User({
      name: "System Admin",
      email: "admin@admin.com",
      password: "admin",
      role: "Admin"
    });

    // Seed default student account
    const student = new User({
      name: "Default Student",
      email: "student@student.com",
      password: "student",
      role: "Student",
      uploadedDocuments: 0,
      appliedUniversities: 0
    });

    await admin.save();
    await student.save();
    
    console.log("\n==================================================");
    console.log("🎉 DEFAULT ACCOUNTS SEEDED SUCCESSFULLY!");
    console.log("--------------------------------------------------");
    console.log("👑 ADMIN ACCOUNT:");
    console.log("   • Email:    admin@admin.com");
    console.log("   • Password: admin");
    console.log("--------------------------------------------------");
    console.log("🎓 STUDENT ACCOUNT:");
    console.log("   • Email:    student@student.com");
    console.log("   • Password: student");
    console.log("==================================================\n");
    
  } catch (err) {
    console.error("❌ Error seeding default users:", err);
  } finally {
    process.exit();
  }
});
