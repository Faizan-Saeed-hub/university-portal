import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    setError("");

    // Empty validation

    if (!email || !password) {

      setError(
        "All fields are required."
      );

      return;
    }

    // API Call
    try {
      setLoading(true);
      await axios.post("https://university-admission-support-system.up.railway.app/api/users/login", {
        email,
        password,
        role
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", email);
      localStorage.setItem("userRole", role);
      
      if (role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-page">

        {/* LEFT */}

        <div className="login-left">

          <div className="left-content">

            <h1>
              Welcome Back!
              <br />
              Continue Your
              <br />
              University Journey
            </h1>

            <div className="features">

              <h3>
                🚀 Quick Access to:
              </h3>

              <p>
                • Merit Calculator
              </p>

              <p>
                • AI Recommendations
              </p>

              <p>
                • Document Upload
              </p>

              <p>
                • Chat Support
              </p>

            </div>

          </div>
        </div>

        {/* RIGHT */}

        <div className="login-right">

          <div className="login-card">

            <h2>
              SIGN IN TO YOUR ACCOUNT
            </h2>

            <div className="line"></div>

            {error && (
              <p className="error">
                {error}
              </p>
            )}

            {/* ROLE SELECTION */}
            <div className="role-selector">
              <button
                type="button"
                className={`role-tab ${role === "Student" ? "active" : ""}`}
                onClick={() => setRole("Student")}
              >
                <svg viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Student
              </button>
              <button
                type="button"
                className={`role-tab ${role === "Admin" ? "active" : ""}`}
                onClick={() => setRole("Admin")}
              >
                <svg viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Admin
              </button>
            </div>

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
                  showPassword
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
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                👁
              </span>

            </div>

            {/* BUTTON */}

            <button
              className="login-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>

            {/* FORGOT */}

            <p className="forgot-password">
              Forgot Password?
            </p>

            {/* SIGNUP */}

            <p className="signin-text">

              Don't have an account?{" "}

              <span
                onClick={() =>
                  navigate("/signup")
                }
              >
                Sign Up
              </span>

            </p>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;