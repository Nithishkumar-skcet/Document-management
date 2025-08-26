import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function DocumentList({ docs, setDocs }) {
  const { token } = useAuth();

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/documents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocs(res.data);
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    };
    fetchDocs();
  }, [token, setDocs]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocs(docs.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  const handleDownload = (id) => {
    // include token in query if backend requires it
    window.location.href = `http://localhost:8080/documents/download/${id}?token=${token}`;
  };

  return (
    <div className="doc-list">
      <h2>My Documents</h2>
      <ul>
        {docs.map((doc) => (
          <li key={doc.id}>
            {doc.title} ({doc.fileType}, {Math.round(doc.size / 1024)} KB)
            <button onClick={() => handleDownload(doc.id)}>Download</button>
            <button onClick={() => handleDelete(doc.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
