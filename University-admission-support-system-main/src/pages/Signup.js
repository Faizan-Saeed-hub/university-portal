import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Signup.css";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] = useState("");

  const [showPass, setShowPass] =
    useState(false);

  const [showConfirmPass,
    setShowConfirmPass] = useState(false);

  const [agree, setAgree] =
    useState(false);

  const [error, setError] =
    useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {

    setError("");

    // Empty fields

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError(
        "All fields are required."
      );
      return;
    }

    // Name validation

    const nameRegex =
      /^[A-Za-z\s]{5,}$/;

    if (!nameRegex.test(name)) {

      setError(
        "Name must contain only letters and minimum 5 characters."
      );

      return;
    }

    // Email validation

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      setError(
        "Please enter valid email."
      );

      return;
    }

    // Password length

    if (password.length < 6) {

      setError(
        "Password must be at least 6 characters."
      );

      return;
    }

    // Password match

    if (
      password !== confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;
    }

    // Terms checkbox

    if (!agree) {

      setError(
        "Please agree to Terms & Conditions."
      );

      return;
    }

    // API Call
    try {
      setLoading(true);
      await axios.post("https://university-admission-support-system.up.railway.app/api/users/signup", {
        name,
        email,
        password
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="signup-page">

        {/* LEFT */}

        <div className="signup-left">

          <div className="left-content">

            <span className="robot">
              🤖
            </span>

            <h1>
              Join 10,000+ Students
              <br />
              Who Found Their
              <br />
              Perfect University
            </h1>

            <div className="features">

              <p>
                ✅ Smart Recommendations
              </p>

              <p>
                ✅ Accurate Merit Predictions
              </p>

              <p>
                ✅ 24/7 AI Support
              </p>

            </div>

            <div className="trusted">
              🏆 Trusted Platform
            </div>

          </div>
        </div>

        {/* RIGHT */}

        <div className="signup-right">

          <div className="signup-card">

            <span className="signup-icon">
              📝
            </span>

            <h2>
              CREATE YOUR ACCOUNT
            </h2>

            <div className="line"></div>

            {error && (
              <p className="error">
                {error}
              </p>
            )}

            {/* NAME */}

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            {/* EMAIL */}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            {/* PASSWORD */}

            <div className="password-field">

              <input
                type={
                  showPass
                    ? "text"
                    : "password"
                }

                placeholder="Password"

                value={password}

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <span
                onClick={() =>
                  setShowPass(!showPass)
                }
              >
                👁
              </span>

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="password-field">

              <input
                type={
                  showConfirmPass
                    ? "text"
                    : "password"
                }

                placeholder="Confirm Password"

                value={confirmPassword}

                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
              />

              <span
                onClick={() =>
                  setShowConfirmPass(
                    !showConfirmPass
                  )
                }
              >
                👁
              </span>

            </div>

            {/* CHECKBOX */}

            <div className="checkbox">

              <input
                type="checkbox"
                checked={agree}
                onChange={() =>
                  setAgree(!agree)
                }
              />

              <label>
                I agree to Terms &
                Conditions and Privacy
                Policy
              </label>

            </div>

            {/* BUTTON */}

            <button
              className="signup-btn"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>

            {/* LOGIN */}

            <p className="signin-text">

              Already have an account?{" "}

              <span
                onClick={() =>
                  navigate("/login")
                }
              >
                Sign In
              </span>

            </p>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Signup;