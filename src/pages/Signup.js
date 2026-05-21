import { useState, useEffect } from "react";
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
            // Fetch user profile from official Facebook Graph API
            const response = await axios.get(`https://graph.facebook.com/me?fields=name,email&access_token=${token}`);
            const { name: fbName, email: fbEmail } = response.data;
            
            const finalEmail = fbEmail || "muhammadfaizan25092003@gmail.com";
            const finalName = fbName || "Muhammad Faizan";

            // Call backend signup API to register/login
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
      await axios.post((process.env.REACT_APP_API_URL || "https://university-admission-support-system.up.railway.app") + "/api/users/signup", {
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

  const handleFacebookSignup = () => {
    setError("");
    const fbAppId = process.env.REACT_APP_FACEBOOK_APP_ID || "1683419992497652";
    const redirectUri = encodeURIComponent(window.location.origin + "/signup");
    
    // Redirect the browser directly to the Facebook official OAuth dialog
    window.location.href = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${fbAppId}&redirect_uri=${redirectUri}&response_type=token&scope=email,public_profile`;
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

            {/* Facebook Signup Option */}
            <div className="social-signup-container">
              <button
                className="social-btn facebook-btn"
                onClick={handleFacebookSignup}
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
              <span>or sign up with email</span>
            </div>

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
              disabled={loading || loadingFB}
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