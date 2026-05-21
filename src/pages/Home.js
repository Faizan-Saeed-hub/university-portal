import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");
    if (isLoggedIn) {
      if (userRole === "Admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      navigate("/login");
    }
  };

  const universities = [
    {
      name: "University of Sargodha",
      image:
        "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Punjab University",
      image:
        "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "GC University Faisalabad",
      image:
        "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "University of Lahore",
      image:
        "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ];
  const educationImages = [
    "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1184572/pexels-photo-1184572.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ];
  return (
    <div className="home-page">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-left">
          <span className="tagline">
            🎓 AI-Powered Admission Platform
          </span>

          <h1 className="hero-title">
            Your Smart <span>University</span>
            <br />
            Admission Assistant
          </h1>

          <p>
            Discover the best universities, predict your merit,
            compare programs, and get instant AI guidance for
            admissions in Pakistan.
          </p>

          <div className="hero-features">
            <div>✔ Smart Recommendations</div>
            <div>✔ Merit Predictions</div>
            <div>✔ 24/7 AI Chat Support</div>
          </div>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={handleGetStarted}
            >
              Get Started
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/universities")}
            >
              Explore Universities
            </button>
          </div>

          <div className="trusted">
            ⭐ Trusted by <span>10,000+</span> students across Pakistan
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-right">
            <img
              src={
                educationImages[
                Math.floor(Math.random() * educationImages.length)
                ]
              }
              alt="University Students"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="section-title">
          <h2>✨ Why Choose UniAdmit?</h2>

          <p>
            Everything you need to make better university
            admission decisions
          </p>
        </div>

        <div className="features-grid">

          <div className="feature-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Smart Matching"
              className="feature-image"
            />

            <h3>Smart Matching</h3>

            <p>
              Find universities that perfectly match your merit
              and goals.
            </p>
          </div>

          <div className="feature-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2620/2620992.png"
              alt="Accurate Merit"
              className="feature-image"
            />

            <h3>Accurate Merit</h3>

            <p>
              95% accurate merit predictions using previous year
              data.
            </p>
          </div>

          <div className="feature-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
              alt="AI Chat"
              className="feature-image"
            />

            <h3>AI Chat Support</h3>

            <p>
              Ask questions anytime and get instant guidance.
            </p>
          </div>

          <div className="feature-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
              alt="Fast Process"
              className="feature-image"
            />

            <h3>Fast Process</h3>

            <p>
              Save hours of research with one smart platform.
            </p>
          </div>

        </div>
      </section>

      {/* UNIVERSITIES SECTION */}
      <section className="universities-section">
        <div className="universities-section-title">
          <h2>🏛 Partner Universities</h2>

          <p>
            Explore top universities of Pakistan
          </p>
        </div>

        <div className="university-grid">
          {universities.map((uni, index) => (
            <div className="university-card" key={index}>
              <img
                src={uni.image}
                alt={uni.name}
              />

              <h3>{uni.name}</h3>
            </div>
          ))}
        </div>
      </section>
      {/* CTA SECTION */}

      <section className="cta-section">
        <div className="cta-box">

          <h2>
            🚀 Ready to Find Your Perfect University Match?
          </h2>

          <p>
            Join 10,000+ successful students who simplified their
            admission journey with AI-powered guidance.
          </p>

          <button
            className="cta-btn"
            onClick={handleGetStarted}
          >
            🎯 Get Started Now
          </button>

          <span>
            ⏱ It only takes 2 minutes to see your matches
          </span>

        </div>
      </section>

      <Footer />
    </div>
  );
}