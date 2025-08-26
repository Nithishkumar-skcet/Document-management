import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardPage.css";

export default function DashboardPage() {
  const { user, logout } = useAuth();
    const navigate = useNavigate();
     const handleLogout = () => {
    logout();           // clears user + localStorage
    navigate("/login"); // ✅ redirect safely
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">📄 Document Management System</div>
        <nav className="nav-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/documents">My Documents</Link>
          <Link to="/folders">Folders</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/search">Search</Link>
          <Link to="/activity">Activity Logs</Link>
          <Link to="/profile">Update Profile</Link>
          {user?.user?.role === "ADMIN" && <Link to="/admin">Admin</Link>}
        </nav>
        <div className="user-info">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="dashboard-body">
        <aside className="sidebar">
          <ul>
            <li><Link to="/upload">⬆ Upload & Manage Docs </Link></li>
            <li><Link to="/folders">📂 Folder Management </Link></li>
            <li><Link to="/visibility">🔒 Public/Private Control </Link></li>
            <li><Link to="/sharing">🤝 Sharing & Permissions </Link></li>
            <li><Link to="/ownership">👤 Ownership Tracking </Link></li>
            <li><Link to="/search">🔍 Search & Filters </Link></li>
            <li><Link to="/activity">📜 Activity Logs </Link></li>
            <li><Link to="/archive">🗑 Deletion & Archiving </Link></li>
            {user?.user?.role === "ADMIN" && (
              <li><Link to="/admin">🛠 Admin Panel</Link></li>
            )}
          </ul>
        </aside>

        <main className="content">
          <h2>Dashboard Overview</h2>
          <p className="intro-text">
            Welcome to the <b>Document Management System</b>. Here you can 
            upload, manage, share, and organize your documents securely.
          </p>

          <div className="quick-actions">
            <Link to="/upload" className="btn primary">Upload New Document</Link>
            <Link to="/documents" className="btn secondary">Manage My Documents</Link>
            <Link to="/folders" className="btn secondary">Organize Folders</Link>
            <Link to="/search" className="btn secondary">Search Documents</Link>
          </div>

          <section className="requirements-overview">
            <h3>Core Features</h3>
            <ul>
              <li> Document Upload & Management</li>
              <li> Folder/Directory Management</li>
              <li> Public/Private Document Visibility</li>
              <li> Sharing & Permissions</li>
              <li> Ownership Tracking</li>
              <li> Search & Filtering</li>
              <li> Activity Logging & History</li>
              <li> Document Deletion & Archiving</li>
            </ul>
          </section>
        </main>
      </div>

      <footer className="dashboard-footer">
        © {new Date().getFullYear()} Document Management System – All Rights Reserved.
      </footer>
    </div>
  );
}
