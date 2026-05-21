import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";

const API = "https://university-admission-support-system.up.railway.app/api/admin";
const BASE = "https://university-admission-support-system.up.railway.app";

const Documents = () => {
  const [docs, setDocs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => { fetchDocs(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(docs.filter((d) => d.userEmail?.toLowerCase().includes(q)));
  }, [search, docs]);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/documents`);
      setDocs(res.data);
      setFiltered(res.data);
    } catch {
      setError("Failed to load documents. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const deleteDoc = async (id) => {
    if (!window.confirm("Delete this document record?")) return;
    try {
      await axios.delete(`${API}/documents/${id}`);
      fetchDocs();
    } catch { alert("Failed to delete document."); }
  };

  const FileLink = ({ path, label }) => {
    if (!path) return <span style={{ color: "var(--text-muted)" }}>—</span>;
    return (
      <a
        href={`${BASE}/${path.replace(/\\/g, "/")}`}
        target="_blank"
        rel="noreferrer"
        className="btn btn-ghost"
        style={{ textDecoration: "none", fontSize: "11px", padding: "4px 10px" }}
      >
        📎 {label}
      </a>
    );
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-content fade-in">
        <AdminNavbar />

        <div className="section-header">
          <div>
            <div className="section-title">Documents</div>
            <div className="section-sub">
              {loading ? "Loading..." : `${filtered.length} uploaded result document${filtered.length !== 1 ? "s" : ""}`}
            </div>
          </div>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              placeholder="Search by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "10px", padding: "14px 18px", marginBottom: "20px",
            color: "var(--accent-red)", fontSize: "13px"
          }}>
            ⚠️ {error}
          </div>
        )}

        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student Email</th>
                <th>Matric</th>
                <th>Intermediate</th>
                <th>Entry Test</th>
                <th>Uploaded</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="empty-row">
                  <td colSpan="7">
                    <div className="loading-state"><div className="spinner"></div> Loading documents...</div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan="7">
                    {search ? "No documents match your search." : "No documents uploaded yet."}
                  </td>
                </tr>
              ) : (
                filtered.map((doc, i) => (
                  <tr key={doc._id}>
                    <td style={{ color: "var(--text-muted)", fontSize: "12px" }}>{i + 1}</td>
                    <td style={{ fontWeight: 600 }}>{doc.userEmail}</td>
                    <td><FileLink path={doc.matric} label="Matric" /></td>
                    <td><FileLink path={doc.inter} label="Inter" /></td>
                    <td><FileLink path={doc.entryTest} label="Entry Test" /></td>
                    <td style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                      {doc.uploadedAt
                        ? new Date(doc.uploadedAt).toLocaleDateString("en-PK", {
                            day: "numeric", month: "short", year: "numeric"
                          })
                        : "—"}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-icon"
                        title="Delete record"
                        onClick={() => deleteDoc(doc._id)}
                      >🗑️</button>
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

export default Documents;
