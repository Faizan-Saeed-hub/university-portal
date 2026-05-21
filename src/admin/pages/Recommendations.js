import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";

const Recommendations = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-content">
        <AdminNavbar />
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ color: "#f1f5f9", marginBottom: "20px" }}>🎯 Recommendations</h2>
          <p style={{ color: "#94a3b8" }}>
            This section will display university recommendation logs generated for students.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
