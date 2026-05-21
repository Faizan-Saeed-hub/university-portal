import React from "react";
import { Link } from "react-router-dom";
import "../styles/Admin.css";

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">Admin Panel</h2>

      <ul>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/universities">Universities</Link></li>
        <li><Link to="/admin/documents">Documents</Link></li>
        <li><Link to="/admin/recommendations">Recommendations</Link></li>
      </ul>
    </div>
    );
};

export default AdminSidebar;