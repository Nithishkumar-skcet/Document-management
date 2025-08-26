import { useState } from "react";
import axios from "axios";
import "./Search.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:8080"; // adjust if needed

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API_URL}/documents/search?query=${query}`);
      setResults(res.data);
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2 className="search-title">🔍 Document Search</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter keywords, titles, or tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {/* Loader */}
      {loading && <p className="loading">Searching...</p>}
      {error && <p className="error">{error}</p>}

      {/* Results */}
      <div className="results-section">
        {results.length > 0 ? (
          <ul className="results-list">
            {results.map((doc) => (
              <li key={doc.id} className="result-card">
                <div className="doc-header">
                  <h3 className="doc-title">{doc.title}</h3>
                  <span className={`doc-visibility ${doc.visibility}`}>
                    {doc.visibility}
                  </span>
                </div>
                <p className="doc-description">{doc.description || "No description available."}</p>
                <div className="doc-meta">
                  <span>📂 {doc.folderName || "Uncategorized"}</span>
                  <span>👤 {doc.ownerName}</span>
                  <span>📅 {new Date(doc.createdAt).toLocaleDateString()}</span>
                </div>
                <button className="open-btn">Open</button>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="no-results">No documents found.</p>
        )}
      </div>
    </div>
  );
}
