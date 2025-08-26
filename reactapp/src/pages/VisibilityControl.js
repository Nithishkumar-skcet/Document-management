import { useEffect, useState } from "react";
import axios from "axios";
import "./VisibilityControl.css";

export default function VisibilityControl() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8080";

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

  const toggleVisibility = async (docId, currentStatus) => {
    try {
      const res = await axios.put(
        `${API_URL}/documents/${docId}/visibility`,
        { visibility: currentStatus === "PUBLIC" ? "PRIVATE" : "PUBLIC" },
        { withCredentials: true }
      );

      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === docId ? { ...doc, visibility: res.data.visibility } : doc
        )
      );
    } catch (err) {
      console.error("Error updating visibility:", err);
    }
  };

  return (
    <div className="visibility-container">
      <h2>🔒 Public / Private Control</h2>
      <p className="intro-text">
        Manage visibility of your documents. Keep them <b>Private</b> for personal access or make them <b>Public</b> for collaboration.
      </p>

      {loading ? (
        <p className="loading">Loading documents...</p>
      ) : documents.length === 0 ? (
        <p className="no-docs">No documents found.</p>
      ) : (
        <table className="visibility-table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Owner</th>
              <th>Visibility</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.title}</td>
                <td>{doc.owner?.name || "Unknown"}</td>
                <td>
                  <span
                    className={`status-badge ${
                      doc.visibility === "PUBLIC" ? "public" : "private"
                    }`}
                  >
                    {doc.visibility}
                  </span>
                </td>
                <td>
                  <button
                    className="toggle-btn"
                    onClick={() => toggleVisibility(doc.id, doc.visibility)}
                  >
                    {doc.visibility === "PUBLIC" ? "Make Private" : "Make Public"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
