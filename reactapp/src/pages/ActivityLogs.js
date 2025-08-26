import { useEffect, useState } from "react";
import axios from "axios";
import "./ActivityLogs.css";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8080";

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/activity`, { withCredentials: true });
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to fetch activity logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="activity-container">
      <h2>📜 Activity Logs</h2>
      <p className="intro-text">
        Track all document activities — uploads, edits, sharing, deletions, and more.
      </p>

      {loading ? (
        <p className="loading">Loading activity logs...</p>
      ) : logs.length === 0 ? (
        <p className="no-logs">No activity logs found.</p>
      ) : (
        <table className="activity-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Document</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.user?.name || "Unknown"}</td>
                <td>{log.action}</td>
                <td>{log.documentTitle || "-"}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
