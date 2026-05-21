import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Dashboard.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {

  const navigate = useNavigate();

  const currentUserEmail = localStorage.getItem("currentUser");
  const [currentUser, setCurrentUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (currentUserEmail) {
      axios.get(`https://university-admission-support-system.up.railway.app/api/users/${currentUserEmail}`)
        .then(res => {
          setCurrentUser(res.data);
          setProfileImage(res.data.profileImage);
        })
        .catch(err => console.error("Error fetching user data:", err));
    }
  }, [currentUserEmail]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result;
        await axios.put(`https://university-admission-support-system.up.railway.app/api/users/${currentUserEmail}`, {
          profileImage: base64Image
        });
        setProfileImage(base64Image);
      } catch (err) {
        console.error("Error updating profile image:", err);
      }
    };
    reader.readAsDataURL(file);
  };

  return (

    <div className="dashboard-container">

      <Navbar />

      {/* MAIN */}

      <main className="main-content">

        <div className="dashboard-grid">

          {/* LEFT COLUMN */}

          <div className="column-left">

            {/* PROFILE CARD */}

            <div className="card profile-card">

              {/* TOP */}

              <div className="profile-top">

                <div className="avatar-wrapper">

                  {profileImage ? (

                    <img
                      src={profileImage}
                      alt="Profile"
                      className="profile-image"
                    />

                  ) : (

                    <div className="avatar-circle">

                      {currentUser?.name
                        ?.charAt(0)
                        .toUpperCase()}

                    </div>

                  )}

                  <label className="upload-icon">

                    📷

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      hidden
                    />

                  </label>

                </div>

                <div>

                  <h2 className="card-title">

                    Welcome,
                    <br />

                    {currentUser?.name}

                  </h2>



                </div>

              </div>

              {/* PROFILE INFO */}

              <div className="profile-info">

                {/* EMAIL */}

                <div className="info-item">

                  <span>Email</span>

                  <p>
                    {currentUser?.email}
                  </p>

                </div>

                {/* MERIT */}

                <div className="info-item">

                  <span>Merit Score</span>

                  <p>

                    {currentUser?.merit
                      ? `${currentUser.merit}%`
                      : "Not Calculated"}

                  </p>

                  {currentUser?.merit && (

                    <div className="progress-bar">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${currentUser.merit}%`,
                        }}
                      ></div>

                    </div>

                  )}

                </div>

                {/* DOCUMENTS */}

                <div className="info-item">

                  <span>
                    Uploaded Documents
                  </span>

                  <p>

                    {currentUser?.uploadedDocuments || 0}
                    {" "}Documents

                  </p>

                </div>

                {/* UNIVERSITIES */}

                <div className="info-item">

                  <span>
                    Applied Universities
                  </span>

                  <p>
                    {currentUser?.appliedUniversities || 0}
                  </p>

                </div>

                {/* STATUS */}

                <div className="info-item">

                  <span>Status</span>

                  <p className="status-active">

                    {currentUser?.merit
                      ? "Eligible"
                      : "Pending"}

                  </p>

                </div>

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}

          <div className="column-right">

            {/* TOP ROW */}

            <div className="middle-row">

              {/* UNIVERSITY */}

              <div
                className="card clickable-card top-row-card"

                onClick={() =>
                  navigate("/universities")
                }
              >

                <h3 className="card-title-large">
                  University List
                </h3>

                <p className="card-subtitle">
                  View universities with admit openings
                </p>

              </div>

              {/* UPLOAD */}

              <div
                className="card clickable-card top-row-card"

                onClick={() =>
                  navigate("/upload")
                }

                style={{ cursor: "pointer" }}
              >

                <h3 className="card-title-small">
                  Upload Documents
                </h3>

                <p className="card-subtitle">
                  Upload necessary documents
                </p>

              </div>

            </div>

            {/* MIDDLE */}

            <div className="middle-row">

              {/* ELIGIBILITY */}

              <div
                className="card clickable-card middle-row-card "

                onClick={() =>
                  navigate("/eligibility")
                }

                style={{ cursor: "pointer" }}
              >

                <h3 className="card-title-small">
                  Eligibility Check
                </h3>

                <p className="card-subtitle">
                  Check your eligibility
                </p>

              </div>

              {/* RECOMMENDATION */}

              <div
                className="card clickable-card middle-row-card "

                onClick={() =>
                  navigate("/UniversityFinder")
                }

                style={{ cursor: "pointer" }}
              >

                <h3 className="card-title-small">
                  Recommendations
                </h3>

                <p className="card-subtitle">
                  Get recommended universities
                </p>

              </div>

            </div>

            {/* CHATBOT */}

            <div
              className="card chatbot-card clickable-card"

              onClick={() =>
                navigate("/chatbot")
              }

              style={{ cursor: "pointer" }}
            >

              <div className="chat-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >

                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 14v-2h12v2H6zm0-3v-2h12v2H6zm0-3V6h12v2H6z"></path>

                </svg>

              </div>

              <div className="chat-text">

                <h3 className="card-title-small">
                  Chatbot
                </h3>

                <p className="card-subtitle">
                  Chat with our AI chatbot
                </p>

              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
};

export default Dashboard;