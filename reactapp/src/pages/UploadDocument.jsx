import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function UploadDocument({ onUpload }) {
  const { token } = useAuth();
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8080/documents/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ attach token
          // ⚠️ don't set Content-Type manually, axios will handle it
        },
      });
      onUpload(res.data);
      setFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="upload-box">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
