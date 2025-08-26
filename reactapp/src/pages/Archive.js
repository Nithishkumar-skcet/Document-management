import { useEffect, useState } from "react";
import axios from "axios";
import "./Archive.css";

export default function Archive() {
  const [documents, setDocuments] = useState([]);
  const [archivedDocs, setArchivedDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8080";

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await axios.get(`${API_URL}/documents`, { withCredentials: true });
        const active = res.data.filter((doc) => !doc.archived);
        const archived = res.data.filter((doc) => doc.archived);

        setDocuments(active);
        setArchivedDocs(archived);
      } catch (err) {
        console.error("Error fetching documents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  const handleArchive = async (id) => {
    try {
      await axios.put(`${API_URL}/documents/${id}/archive`, {}, { withCredentials: true });
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      const archivedDoc = documents.find((doc) => doc.id === id);
      setArchivedDocs((prev) => [...prev, { ...archivedDoc, archived: true }]);
    } catch (err) {
      console.error("Error archiving document:", err);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.put(`${API_URL}/documents/${id}/restore`, {}, { withCredentials: true });
      setArchivedDocs((prev) => prev.filter((doc) => doc.id !== id));
      const restoredDoc = archivedDocs.find((doc) => doc.id === id);
      setDocuments((prev) => [...prev, { ...restoredDoc, archived: false }]);
    } catch (err) {
      console.error("Error restoring document:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ Are you sure you want to permanently delete this document?")) return;

    try {
      await axios.delete(`${API_URL}/documents/${id}`, { withCredentials: true });
      setArchivedDocs((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  return (
    <div className="archive-container">
      <h2>🗑 Deletion & Archiving</h2>
      <p className="intro-text">
        Manage your documents by archiving, restoring, or permanently deleting them.  
        Archiving is recommended to keep records without cluttering active workspace.
      </p>

      {loading ? (
        <p className="loading">Loading documents...</p>
      ) : (
        <>
          {/* Active Documents */}
          <h3>📂 Active Documents</h3>
          {documents.length === 0 ? (
            <p className="empty-text">No active documents available.</p>
          ) : (
            <table className="archive-table">
              <thead>
                <tr>
                  <th>Document Title</th>
                  <th>Owner</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.title}</td>
                    <td>{doc.owner?.name || "Unknown"}</td>
                    <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="archive-btn" onClick={() => handleArchive(doc.id)}>
                        Archive
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Archived Documents */}
          <h3>📦 Archived Documents</h3>
          {archivedDocs.length === 0 ? (
            <p className="empty-text">No archived documents available.</p>
          ) : (
            <table className="archive-table">
              <thead>
                <tr>
                  <th>Document Title</th>
                  <th>Owner</th>
                  <th>Archived On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {archivedDocs.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.title}</td>
                    <td>{doc.owner?.name || "Unknown"}</td>
                    <td>{new Date(doc.updatedAt).toLocaleDateString()}</td>
                    <td>
                      <button className="restore-btn" onClick={() => handleRestore(doc.id)}>
                        Restore
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(doc.id)}>
                        Delete Permanently
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
