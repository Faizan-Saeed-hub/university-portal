import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Simulated OTP handling for out-of-the-box local testing
  const [simulatedData, setSimulatedData] = useState(null);
  const [showSimInbox, setShowSimInbox] = useState(false);

  // Countdown timer for Resend OTP
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        (process.env.REACT_APP_API_URL || "https://university-admission-support-system.up.railway.app") +
          "/api/users/forgot-password",
        { email }
      );

      setSuccessMessage("Verification code has been processed.");
      if (res.data.simulated) {
        setSimulatedData({
          otp: res.data.otp,
          email: email
        });
        setShowSimInbox(true);
      }
      setStep(2);
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to process request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    setError("");
    setSuccessMessage("");
    try {
      setLoading(true);
      const res = await axios.post(
        (process.env.REACT_APP_API_URL || "https://university-admission-support-system.up.railway.app") +
          "/api/users/forgot-password",
        { email }
      );

      setSuccessMessage("A new verification code has been generated.");
      if (res.data.simulated) {
        setSimulatedData({
          otp: res.data.otp,
          email: email
        });
        setShowSimInbox(true);
      }
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend code.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        (process.env.REACT_APP_API_URL || "https://university-admission-support-system.up.railway.app") +
          "/api/users/verify-otp",
        { email, otp }
      );

      setSuccessMessage("Code verified. Please set your new password.");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid or expired verification code.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill out all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        (process.env.REACT_APP_API_URL || "https://university-admission-support-system.up.railway.app") +
          "/api/users/reset-password",
        { email, otp, newPassword }
      );

      setSuccessMessage("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password. Please restart the process.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="forgot-password-page">
        {/* Step-by-Step progress tracker */}
        <div className="recovery-progress-container">
          <div className="recovery-progress-bar">
            <div 
              className="recovery-progress-fill" 
              style={{ width: step === 1 ? "15%" : step === 2 ? "50%" : "100%" }}
            ></div>
          </div>
          <div className="progress-step-labels">
            <div className={`step-label ${step >= 1 ? "active" : ""}`}>
              <span className="step-num">1</span> Request Code
            </div>
            <div className={`step-label ${step >= 2 ? "active" : ""}`}>
              <span className="step-num">2</span> Verify OTP
            </div>
            <div className={`step-label ${step >= 3 ? "active" : ""}`}>
              <span className="step-num">3</span> Reset Pass
            </div>
          </div>
        </div>

        <div className="forgot-password-card">
          <div className="fp-card-header">
            <div className="fp-logo">🔐</div>
            <h2>Password Recovery</h2>
            <p>
              {step === 1 && "Enter your email to receive a secure 6-digit verification code."}
              {step === 2 && `We've generated a 6-digit OTP code for ${email}.`}
              {step === 3 && "Secure your account by entering a new password below."}
            </p>
          </div>

          <div className="line"></div>

          {error && <div className="error-banner">{error}</div>}
          {successMessage && <div className="success-banner">{successMessage}</div>}

          {/* STEP 1: ENTER EMAIL */}
          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="fp-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <button type="submit" className="fp-btn" disabled={loading}>
                {loading ? "SENDING CODE..." : "SEND VERIFICATION CODE"}
              </button>
            </form>
          )}

          {/* STEP 2: VERIFY OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="fp-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="6-Digit OTP Code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  disabled={loading}
                  maxLength={6}
                  required
                  className="otp-input-field"
                />
              </div>

              <div className="resend-timer-container">
                {canResend ? (
                  <button type="button" className="resend-otp-btn" onClick={handleResendOtp} disabled={loading}>
                    Resend Code
                  </button>
                ) : (
                  <p className="timer-text">Resend code in <span>{timer}s</span></p>
                )}
              </div>

              <div className="fp-btn-group">
                <button type="button" className="fp-btn-back" onClick={() => setStep(1)} disabled={loading}>
                  Back
                </button>
                <button type="submit" className="fp-btn" disabled={loading || otp.length !== 6}>
                  {loading ? "VERIFYING..." : "VERIFY CODE"}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: NEW PASSWORD */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="fp-form">
              <div className="form-group">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <button type="submit" className="fp-btn" disabled={loading}>
                {loading ? "UPDATING PASSWORD..." : "UPDATE PASSWORD"}
              </button>
            </form>
          )}

          <div className="fp-card-footer">
            <span onClick={() => navigate("/login")} className="back-to-signin">
              Back to Sign In
            </span>
          </div>
        </div>

        {/* MOCK EMAIL INBOX OVERLAY (Frictionless Local Testing helper) */}
        {showSimInbox && simulatedData && (
          <div className="sim-inbox-overlay">
            <div className="sim-inbox-card">
              <div className="sim-inbox-header">
                <div className="sim-inbox-title">
                  <span className="email-icon">📬</span>
                  <h4>Developer SMTP Simulator</h4>
                </div>
                <button className="sim-close-btn" onClick={() => setShowSimInbox(false)}>
                  ×
                </button>
              </div>
              <div className="sim-inbox-body">
                <p className="sim-meta"><strong>From:</strong> UniAdmit Support &lt;support@uniadmit.com&gt;</p>
                <p className="sim-meta"><strong>To:</strong> {simulatedData.email}</p>
                <p className="sim-meta"><strong>Subject:</strong> UniAdmit - Password Reset Verification Code</p>
                <div className="sim-email-content">
                  <p>Hello,</p>
                  <p>Here is your secure password reset verification code:</p>
                  <div className="sim-otp-box">{simulatedData.otp}</div>
                  <p className="sim-warning">This code was returned by the API response for ease of testing without setting up real SMTP credentials. Paste it into the input box above to proceed.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
