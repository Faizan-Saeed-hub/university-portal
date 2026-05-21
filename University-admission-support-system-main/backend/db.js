const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

// Ensure SRV records can be resolved properly by setting standard DNS servers
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  console.warn("⚠️ Warning: Could not set custom DNS servers, using system default.", e.message);
}

const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eligibilityDB";
    await mongoose.connect(connUri);
    console.log(`MongoDB Connected successfully to: ${connUri.startsWith("mongodb+srv") ? "MongoDB Atlas (Cloud)" : "Local MongoDB"}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;