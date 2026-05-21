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

// ================= FORGOT PASSWORD =================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No account found with this email" });
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save to user with 10 minutes expiry
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    let simulated = true;
    let emailSent = false;

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        await transporter.sendMail({
          from: `"UniAdmit Support" <${smtpUser}>`,
          to: email,
          subject: "UniAdmit - Password Reset Verification Code",
          text: `Your password reset verification code is: ${otp}. This code will expire in 10 minutes.`,
          html: `<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px; max-width: 600px;">
                  <h2 style="color: #1a73e8; margin-top: 0;">Password Reset Request</h2>
                  <p>Hello,</p>
                  <p>We received a request to reset your password for your UniAdmit account. Use the following verification code to proceed:</p>
                  <div style="font-size: 24px; font-weight: bold; background: #f1f3f4; padding: 15px; text-align: center; letter-spacing: 5px; border-radius: 4px; color: #202124; margin: 20px 0;">
                    ${otp}
                  </div>
                  <p style="color: #5f6368; font-size: 14px;">This code is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
                  <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
                  <p style="color: #9aa0a6; font-size: 12px; text-align: center;">UniAdmit Support Team</p>
                </div>`
        });

        simulated = false;
        emailSent = true;
        console.log(`[SMTP EMAIL] Sent password reset OTP to ${email}`);
      } catch (emailErr) {
        console.error("Nodemailer failed to send email, falling back to simulated mode:", emailErr);
      }
    }

    if (simulated) {
      console.log(`\n======================================================`);
      console.log(`[SIMULATED EMAIL] Password Reset Verification Code`);
      console.log(`To: ${email}`);
      console.log(`OTP Code: ${otp}`);
      console.log(`======================================================\n`);
    }

    res.status(200).json({
      success: true,
      message: emailSent ? "Verification code sent to your email" : "Verification code generated (simulated)",
      simulated,
      otp: simulated ? otp : undefined
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ================= VERIFY OTP =================
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and verification code are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No account found with this email" });
    }

    if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired verification code" });
    }

    res.status(200).json({ success: true, message: "Code verified successfully" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ================= RESET PASSWORD =================
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No account found with this email" });
    }

    // Verify OTP again for security
    if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired verification code" });
    }

    // Update password and clear reset fields
    user.password = newPassword;
    user.resetPasswordOTP = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
