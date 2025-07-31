import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider.jsx";
import "../pages/Css/AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <button className="logout-btn" onClick={handleLogout}>← Logout</button>

      <div className="admin-header">
        <h2>Welcome, Admin 👑</h2>
      </div>

      <div className="admin-options">
        <button onClick={() => navigate("/admin/users")}>Manage Users</button>
        <button onClick={() => navigate("/admin/posts")}>Manage Posts</button>
      </div>
    </div>
  );
}
