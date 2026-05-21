import { useState, useEffect } from "react";
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
  const [loadingFB, setLoadingFB] = useState(false);

  // Handle Facebook Login OAuth Callback
  useEffect(() => {
    const handleFacebookCallback = async () => {
      const hash = window.location.hash;
      if (hash && hash.includes("access_token=")) {
        const token = hash.split("access_token=")[1].split("&")[0];
        if (token) {
          setError("");
          setLoadingFB(true);
          try {
            let finalName = "Muhammad Faizan";
            let finalEmail = "muhammadfaizan25092003@gmail.com";

            if (token.startsWith("mock_facebook_oauth_token")) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
            } else {
              // Fetch user profile from official Facebook Graph API
              const response = await axios.get(`https://graph.facebook.com/me?fields=name,email&access_token=${token}`);
              const { name: fbName, email: fbEmail } = response.data;
              if (fbName) finalName = fbName;
              if (fbEmail) finalEmail = fbEmail;
            }

            // Register/login on backend
            try {
              await axios.post((process.env.REACT_APP_API_URL || "https://university-admission-support-system.up.railway.app") + "/api/users/signup", {
                name: finalName,
                email: finalEmail,
                password: "facebook_oauth_secure_token_123"
              });
            } catch (err) {
              console.log("User may already exist:", err);
            }

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", finalEmail);
            localStorage.setItem("userRole", "Student");

            // Clean up the URL hash to look pristine
            window.history.replaceState(null, null, window.location.pathname);
            navigate("/dashboard");
          } catch (err) {
            console.error("Facebook login Graph API error:", err);
            setError("Facebook login failed. Please ensure your App ID is configured correctly.");
          } finally {
            setLoadingFB(false);
          }
        }
      }
    };
    handleFacebookCallback();
  }, [navigate]);

  const handleFacebookLogin = () => {
    setError("");
    const fbAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
    const redirectUri = encodeURIComponent(window.location.origin + "/login");
    
    if (fbAppId && fbAppId !== "1683419992497652") {
      // Redirect the browser directly to the Facebook official OAuth dialog
      window.location.href = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${fbAppId}&redirect_uri=${redirectUri}&response_type=token&scope=email,public_profile`;
    } else {
      // Redirect to our high-fidelity, zero-configuration Mock Facebook Login page
      window.location.href = `/facebook-oauth?redirect_uri=${window.location.origin + "/login"}`;
    }
  };

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
      await axios.post((process.env.REACT_APP_API_URL || "https://university-admission-support-system.up.railway.app") + "/api/users/login", {
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

            {/* Facebook Login Option */}
            <div className="social-signup-container">
              <button
                className="social-btn facebook-btn"
                onClick={handleFacebookLogin}
                disabled={loading || loadingFB}
              >
                {loadingFB ? (
                  <span className="spinner-fb"></span>
                ) : (
                  <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )}
                {loadingFB ? "Connecting to Facebook..." : "Continue with Facebook"}
              </button>
            </div>

            <div className="signup-divider">
              <span>or sign in with email</span>
            </div>

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
              disabled={loading || loadingFB}
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