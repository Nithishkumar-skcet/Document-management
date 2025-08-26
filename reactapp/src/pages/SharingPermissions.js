import { useEffect, useState } from "react";
import axios from "axios";
import "./SharingPermissions.css";

export default function SharingPermissions() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("VIEWER");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8080";

  // Fetch documents
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await axios.get(`${API_URL}/documents`, { withCredentials: true });
        setDocuments(res.data);
      } catch (err) {
        console.error("Error fetching documents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  // Fetch permissions for selected document
  const fetchPermissions = async (docId) => {
    try {
      const res = await axios.get(`${API_URL}/documents/${docId}/permissions`, {
        withCredentials: true,
      });
      setPermissions(res.data);
    } catch (err) {
      console.error("Error fetching permissions:", err);
    }
  };

  const handleShare = async () => {
    if (!selectedDoc) return;
    try {
      const res = await axios.post(
        `${API_URL}/documents/${selectedDoc}/permissions`,
        { email, role },
        { withCredentials: true }
      );
      setPermissions((prev) => [...prev, res.data]);
      setEmail("");
      setRole("VIEWER");
    } catch (err) {
      console.error("Error sharing document:", err);
    }
  };

  const handleRemove = async (permId) => {
    try {
      await axios.delete(`${API_URL}/permissions/${permId}`, { withCredentials: true });
      setPermissions((prev) => prev.filter((p) => p.id !== permId));
    } catch (err) {
      console.error("Error removing permission:", err);
    }
  };

  return (
    <div className="sharing-container">
      <h2>🤝 Sharing & Permissions</h2>
      <p className="intro-text">
        Control who can <b>view</b>, <b>edit</b>, or have <b>full access</b> to your documents.
      </p>

      {loading ? (
        <p className="loading">Loading documents...</p>
      ) : (
        <div className="doc-select">
          <label>Select a Document:</label>
          <select
            onChange={(e) => {
              setSelectedDoc(e.target.value);
              fetchPermissions(e.target.value);
            }}
          >
            <option value="">-- Choose Document --</option>
            {documents.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedDoc && (
        <div className="permissions-section">
          <h3>Current Permissions</h3>
          {permissions.length === 0 ? (
            <p>No users have access yet.</p>
          ) : (
            <table className="permissions-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((perm) => (
                  <tr key={perm.id}>
                    <td>{perm.user?.name || "Unknown"}</td>
                    <td>{perm.user?.email}</td>
                    <td>
                      <span className={`role-badge ${perm.role.toLowerCase()}`}>
                        {perm.role}
                      </span>
                    </td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(perm.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <h3>Add Permission</h3>
          <div className="add-permission">
            <input
              type="email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="VIEWER">Viewer</option>
              <option value="EDITOR">Editor</option>
              <option value="OWNER">Full Access</option>
            </select>
            <button className="share-btn" onClick={handleShare}>
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
