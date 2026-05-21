import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* BRAND LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        🎓 <span>UniPortal</span>
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/universities">Universities</Link>
        <Link to="/UniversityFinder">AI Recommendations</Link>
        <Link to="/eligibility">Merit Calculator</Link>
        <Link to="/chatbot">AI Chatbot</Link>
      </div>

      {/* NAV BUTTONS */}
      <div className="nav-buttons">
        {!isLoggedIn ? (
          <>
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="register-btn" onClick={() => navigate("/signup")}>
              Register
            </button>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}