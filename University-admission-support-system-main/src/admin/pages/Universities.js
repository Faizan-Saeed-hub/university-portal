import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";

const API = "https://university-admission-support-system.up.railway.app/api/admin";

const emptyForm = {
  name: "", city: "", type: "Public", averageFee: "", hostel: false, departmentsJSON: "[\n  \n]"
};

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { fetchUniversities(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      universities.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.city?.toLowerCase().includes(q) ||
          u.type?.toLowerCase().includes(q)
      )
    );
  }, [search, universities]);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/universities`);
      setUniversities(res.data);
      setFiltered(res.data);
    } catch {
      console.error("Failed to fetch universities");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditMode(false);
    setEditId(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  const openEdit = (uni) => {
    setEditMode(true);
    setEditId(uni._id);
    setForm({
      name: uni.name || "",
      city: uni.city || "",
      type: uni.type || "Public",
      averageFee: uni.averageFee || "",
      hostel: uni.hostel || false,
      departmentsJSON: JSON.stringify(uni.departments || [], null, 2)
    });
    setError("");
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setError(""); };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.city.trim()) {
      setError("Name and City are required.");
      return;
    }
    
    let parsedDepartments = [];
    try {
      parsedDepartments = JSON.parse(form.departmentsJSON || "[]");
    } catch (e) {
      setError("Invalid JSON format in Departments Data. Please fix errors before saving.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name,
        city: form.city,
        type: form.type,
        averageFee: form.averageFee,
        hostel: form.hostel,
        departments: parsedDepartments
      };

      if (editMode) {
        await axios.put(`${API}/universities/${editId}`, payload);
      } else {
        await axios.post(`${API}/universities`, payload);
      }
      closeModal();
      fetchUniversities();
    } catch {
      setError("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await axios.delete(`${API}/universities/${id}`);
      fetchUniversities();
    } catch {
      alert("Delete failed.");
    }
  };

  const toggleExpand = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-content fade-in">
        <AdminNavbar />

        <div className="section-header">
          <div>
            <div className="section-title">Universities</div>
            <div className="section-sub">
              {loading ? "Loading..." : `${filtered.length} of ${universities.length} universities`}
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {/* Search */}
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                placeholder="Search by name, city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={openAdd}>
              + Add University
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>University</th>
                <th>City</th>
                <th>Type</th>
                <th>Avg Fee (PKR)</th>
                <th>Depts</th>
                <th>Hostel</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="empty-row">
                  <td colSpan="8">
                    <div className="loading-state"><div className="spinner"></div> Loading universities...</div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan="8">No universities found.</td>
                </tr>
              ) : (
                filtered.map((uni, i) => (
                  <React.Fragment key={uni._id}>
                    <tr>
                      <td style={{ color: "var(--text-muted)", fontSize: "12px" }}>{i + 1}</td>
                      <td>
                        <button
                          onClick={() => toggleExpand(uni._id)}
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            color: "var(--text-primary)", fontWeight: 600,
                            fontSize: "13.5px", display: "flex", alignItems: "center", gap: "6px",
                            fontFamily: "inherit", padding: 0,
                          }}
                        >
                          <span style={{ color: expandedId === uni._id ? "var(--accent-blue)" : "var(--text-muted)", fontSize: "10px" }}>
                            {expandedId === uni._id ? "▼" : "▶"}
                          </span>
                          {uni.name}
                        </button>
                      </td>
                      <td>{uni.city}</td>
                      <td>
                        <span className={`badge ${uni.type === "Public" ? "badge-blue" : "badge-purple"}`}>
                          {uni.type}
                        </span>
                      </td>
                      <td>{uni.averageFee?.toLocaleString()}</td>
                      <td>
                        <span className="badge badge-amber">
                          {uni.departments?.length || 0}
                        </span>
                      </td>
                      <td>
                        {uni.hostel
                          ? <span className="badge badge-green">✓ Yes</span>
                          : <span className="badge badge-red">✗ No</span>}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-ghost btn-icon"
                            title="Edit"
                            onClick={() => openEdit(uni)}
                          >✏️</button>
                          <button
                            className="btn btn-danger btn-icon"
                            title="Delete"
                            onClick={() => handleDelete(uni._id, uni.name)}
                          >🗑️</button>
                        </div>
                      </td>
                    </tr>

                    {/* EXPANDED DEPARTMENTS ROW */}
                    {expandedId === uni._id && (
                      <tr className="expand-row">
                        <td colSpan="8">
                          <div className="dept-panel">
                            <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "10px" }}>
                              Departments ({uni.departments?.length || 0})
                            </p>
                            <div className="dept-grid">
                              {uni.departments?.length > 0 ? (
                                uni.departments.map((dept, di) => (
                                  <div className="dept-chip" key={di}>
                                    <div className="dept-chip-name">{dept.name}</div>
                                    <div className="dept-chip-courses">
                                      {dept.courses?.slice(0, 3).join(" · ")}
                                      {dept.courses?.length > 3 && ` +${dept.courses.length - 3} more`}
                                    </div>
                                    <div style={{ marginTop: "6px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                      <span style={{ fontSize: "10px", color: "var(--accent-blue)" }}>
                                        Merit: {dept.meritFormula?.requiredMerit ?? "—"}
                                      </span>
                                      {dept.meritFormula?.entryTestRequired && (
                                        <span style={{ fontSize: "10px", color: "var(--accent-amber)" }}>
                                          Entry Test Required
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>No departments.</p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============ ADD / EDIT MODAL ============ */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">
                {editMode ? "✏️ Edit University" : "🏫 Add University"}
              </span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "8px", padding: "10px 14px", marginBottom: "16px",
                color: "var(--accent-red)", fontSize: "13px"
              }}>
                {error}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">University Name *</label>
                <input
                  className="form-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. University of Lahore"
                />
              </div>
              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  className="form-input"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Lahore"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Type</label>
                <select className="form-select" name="type" value={form.type} onChange={handleChange}>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Average Fee (PKR/year)</label>
                <input
                  className="form-input"
                  name="averageFee"
                  type="number"
                  value={form.averageFee}
                  onChange={handleChange}
                  placeholder="e.g. 95000"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-checkbox-row">
                <input
                  type="checkbox"
                  name="hostel"
                  checked={form.hostel}
                  onChange={handleChange}
                />
                <span style={{ fontSize: "13.5px", color: "var(--text-primary)" }}>
                  Hostel facility available
                </span>
              </label>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Departments Data (JSON)</span>
                <span style={{ color: "var(--text-muted)", textTransform: "none", fontSize: "11px", letterSpacing: "0" }}>
                  Manage courses, merit formulas, and cutoffs here
                </span>
              </label>
              <textarea
                className="form-input"
                name="departmentsJSON"
                value={form.departmentsJSON}
                onChange={handleChange}
                rows={8}
                style={{
                  fontFamily: "monospace",
                  fontSize: "12px",
                  lineHeight: "1.5",
                  background: "#0d1424",
                  resize: "vertical"
                }}
                placeholder={'[\n  {\n    "name": "Computer Science",\n    "courses": ["BS CS"]\n  }\n]'}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : editMode ? "Save Changes" : "Add University"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Universities;