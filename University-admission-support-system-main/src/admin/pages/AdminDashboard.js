import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";

const API = "https://university-admission-support-system.up.railway.app/api/admin";

const statConfig = [
  {
    key: "universities",
    label: "Universities",
    icon: "🏫",
    color: "#4f8ef7",
    iconBg: "rgba(79,142,247,0.12)",
    link: "/admin/universities",
    footer: "Total in database",
  },
  {
    key: "users",
    label: "Registered Users",
    icon: "👥",
    color: "#a855f7",
    iconBg: "rgba(168,85,247,0.12)",
    link: "/admin/users",
    footer: "Student accounts",
  },
  {
    key: "documents",
    label: "Documents",
    icon: "📄",
    color: "#10b981",
    iconBg: "rgba(16,185,129,0.12)",
    link: "/admin/documents",
    footer: "Uploaded results",
  },
  {
    key: "departments",
    label: "Departments",
    icon: "🎓",
    color: "#f59e0b",
    iconBg: "rgba(245,158,11,0.12)",
    link: "/admin/universities",
    footer: "Across all universities",
  },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    universities: 0,
    users: 0,
    documents: 0,
    departments: 0,
  });
  const [recentUnis, setRecentUnis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [uniRes, userRes, docRes] = await Promise.all([
          axios.get(`${API}/universities`),
          axios.get(`${API}/users`),
          axios.get(`${API}/documents`),
        ]);
        const unis = uniRes.data;
        const depts = unis.reduce((sum, u) => sum + (u.departments?.length || 0), 0);
        setStats({
          universities: unis.length,
          users: userRes.data.length,
          documents: docRes.data.length,
          departments: depts,
        });
        setRecentUnis(unis.slice(0, 5));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-content fade-in">
        <AdminNavbar />

        {/* STATS CARDS */}
        <div className="cards">
          {statConfig.map((s) => (
            <Link to={s.link} key={s.key} style={{ textDecoration: "none" }}>
              <div
                className="stat-card"
                style={{ "--card-color": s.color, "--icon-bg": s.iconBg }}
              >
                <div className="stat-card-header">
                  <span className="stat-card-label">{s.label}</span>
                  <div className="stat-card-icon">{s.icon}</div>
                </div>
                <div className="stat-card-value">
                  {loading ? (
                    <span style={{ fontSize: "18px", color: "var(--text-muted)" }}>...</span>
                  ) : (
                    stats[s.key]
                  )}
                </div>
                <div className="stat-card-footer">{s.footer}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* RECENT UNIVERSITIES */}
        <div className="section-header">
          <div>
            <div className="section-title">Recent Universities</div>
            <div className="section-sub">Latest entries in the database</div>
          </div>
          <Link to="/admin/universities" className="btn btn-ghost" style={{ textDecoration: "none" }}>
            View All →
          </Link>
        </div>

        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>University</th>
                <th>City</th>
                <th>Type</th>
                <th>Avg Fee</th>
                <th>Departments</th>
                <th>Hostel</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="empty-row">
                  <td colSpan="7">
                    <div className="loading-state">
                      <div className="spinner"></div> Loading...
                    </div>
                  </td>
                </tr>
              ) : recentUnis.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan="7">No universities found. Seed the database first.</td>
                </tr>
              ) : (
                recentUnis.map((uni, i) => (
                  <tr key={uni._id}>
                    <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                    <td style={{ fontWeight: 600 }}>{uni.name}</td>
                    <td>{uni.city}</td>
                    <td>
                      <span className={`badge ${uni.type === "Public" ? "badge-blue" : "badge-purple"}`}>
                        {uni.type}
                      </span>
                    </td>
                    <td>PKR {uni.averageFee?.toLocaleString()}</td>
                    <td>
                      <span className="badge badge-amber">{uni.departments?.length || 0} depts</span>
                    </td>
                    <td>
                      {uni.hostel ? (
                        <span className="badge badge-green">✓ Yes</span>
                      ) : (
                        <span className="badge badge-red">✗ No</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;