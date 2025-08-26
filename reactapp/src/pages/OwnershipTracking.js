import { useEffect, useState } from "react";
import axios from "axios";
import "./OwnershipTracking.css";

export default function OwnershipTracking() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [newOwnerEmail, setNewOwnerEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8080";

  // Fetch all documents with ownership details
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

  const handleTransfer = async () => {
    if (!selectedDoc || !newOwnerEmail) return;

    try {
      const res = await axios.put(
        `${API_URL}/documents/${selectedDoc}/transfer`,
        { email: newOwnerEmail },
        { withCredentials: true }
      );

      // update UI
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === selectedDoc ? { ...doc, owner: res.data.newOwner } : doc
        )
      );

      setNewOwnerEmail("");
      alert("Ownership transferred successfully ✅");
    } catch (err) {
      console.error("Error transferring ownership:", err);
      alert("Failed to transfer ownership ❌");
    }
  };

  return (
    <div className="ownership-container">
      <h2>👤 Ownership Tracking</h2>
      <p className="intro-text">
        Track and manage document ownership. Transfer ownership when needed to
        ensure accountability and proper access.
      </p>

      {loading ? (
        <p className="loading">Loading documents...</p>
      ) : (
        <table className="ownership-table">
          <thead>
            <tr>
              <th>Document Title</th>
              <th>Current Owner</th>
              <th>Email</th>
              <th>Transfer Ownership</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.title}</td>
                <td>{doc.owner?.name || "Unknown"}</td>
                <td>{doc.owner?.email}</td>
                <td>
                  <button
                    className="transfer-btn"
                    onClick={() => setSelectedDoc(doc.id)}
                  >
                    Transfer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedDoc && (
        <div className="transfer-section">
          <h3>Transfer Ownership</h3>
          <input
            type="email"
            placeholder="Enter new owner's email"
            value={newOwnerEmail}
            onChange={(e) => setNewOwnerEmail(e.target.value)}
          />
          <button className="confirm-btn" onClick={handleTransfer}>
            Confirm Transfer
          </button>
          <button className="cancel-btn" onClick={() => setSelectedDoc(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
