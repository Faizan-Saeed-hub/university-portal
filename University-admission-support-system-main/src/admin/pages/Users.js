import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";

const API = "https://university-admission-support-system.up.railway.app/api/admin";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Create Admin Modal State
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminForm, setAdminForm] = useState({ name: "", email: "", password: "" });
  const [adminError, setAdminError] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);

  useEffect(() => { fetchUsers(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(users.filter(
      (u) => u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q)
    ));
  }, [search, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
      setFiltered(res.data);
    } catch {
      setError("Failed to load users. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try {
      await axios.delete(`${API}/users/${id}`);
      fetchUsers();
    } catch { alert("Failed to delete user."); }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setAdminError("");
    setAdminLoading(true);
    try {
      await axios.post(`${API}/users/create-admin`, adminForm);
      setShowAdminModal(false);
      setAdminForm({ name: "", email: "", password: "" });
      fetchUsers(); // Refresh list
    } catch (err) {
      setAdminError(err.response?.data?.error || "Failed to create admin");
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-content fade-in">
        <AdminNavbar />

        <div className="section-header">
          <div>
            <div className="section-title">Users</div>
            <div className="section-sub">
              {loading ? "Loading..." : `${filtered.length} of ${users.length} users`}
            </div>
          </div>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            className="btn btn-primary" 
            style={{ marginLeft: "15px" }}
            onClick={() => setShowAdminModal(true)}
          >
            + Create Admin
          </button>
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
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="empty-row">
                  <td colSpan="6">
                    <div className="loading-state"><div className="spinner"></div> Loading users...</div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan="6">
                    {search ? "No users match your search." : "No users registered yet."}
                  </td>
                </tr>
              ) : (
                filtered.map((user, i) => (
                  <tr key={user._id}>
                    <td style={{ color: "var(--text-muted)", fontSize: "12px" }}>{i + 1}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "32px", height: "32px", borderRadius: "50%",
                          background: "linear-gradient(135deg, #4f8ef7, #a855f7)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "13px", fontWeight: 700, flexShrink: 0,
                        }}>
                          {(user.name || user.email || "?")[0].toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600 }}>{user.name || "—"}</span>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === "Admin" ? "badge-purple" : "badge-blue"}`}>
                        {user.role || "Student"}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-PK")
                        : "—"}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-icon"
                        title="Delete user"
                        onClick={() => deleteUser(user._id, user.name || user.email)}
                      >🗑️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* CREATE ADMIN MODAL */}
        {showAdminModal && (
          <div className="modal-overlay">
            <div className="modal-content fade-in" style={{ maxWidth: "400px" }}>
              <div className="modal-header">
                <h2>Create Admin Account</h2>
                <button className="modal-close" onClick={() => setShowAdminModal(false)}>×</button>
              </div>
              <div className="modal-body">
                {adminError && <div style={{ color: "var(--accent-red)", marginBottom: "15px", fontSize: "14px" }}>{adminError}</div>}
                <form onSubmit={handleCreateAdmin}>
                  <div className="form-group">
                    <label>Name</label>
                    <input 
                      required
                      placeholder="Admin Name"
                      value={adminForm.name}
                      onChange={e => setAdminForm({...adminForm, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email"
                      required
                      placeholder="admin@example.com"
                      value={adminForm.email}
                      onChange={e => setAdminForm({...adminForm, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input 
                      type="password"
                      required
                      placeholder="Secure Password"
                      value={adminForm.password}
                      onChange={e => setAdminForm({...adminForm, password: e.target.value})}
                    />
                  </div>
                  <div className="modal-footer" style={{ marginTop: "20px" }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAdminModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={adminLoading}>
                      {adminLoading ? "Creating..." : "Create Admin"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Users;