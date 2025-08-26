import { useState } from "react";
import "./UploadPage.css";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }
    // TODO: Call API /documents/upload
    console.log("Uploading document:", { title, description, file });
    alert("Document uploaded successfully!");
    setTitle("");
    setDescription("");
    setFile(null);
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h1 className="upload-title">📄 Upload Document</h1>
        <p className="upload-subtitle">
          Add your documents with title & description.
        </p>

        <form onSubmit={handleUpload} className="upload-form">
          {/* Title */}
          <input
            type="text"
            placeholder="Document Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea-field"
            rows="3"
          ></textarea>

          {/* File Upload */}
          <label className="file-drop-area">
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
              required
            />
            {file ? (
              <span className="file-name">📎 {file.name}</span>
            ) : (
              <span className="file-placeholder">Click or drag a file here</span>
            )}
          </label>

          {/* Submit */}
          <button type="submit" className="upload-btn">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
