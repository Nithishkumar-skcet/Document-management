import { useState } from "react";
import DocumentList from "./DocumentList";
import UploadDocument from "./UploadDocument";
import "./DocumentsPage.css"; // <-- import CSS file

export default function DocumentsPage() {
  const [docs, setDocs] = useState([]);

  const handleNewDoc = (doc) => setDocs([...docs, doc]);

  return (
    <div className="documents-page">
      <h1>Document Management</h1>
      <div className="upload-section">
        <UploadDocument onUpload={handleNewDoc} />
      </div>
      <div className="document-list">
        <DocumentList docs={docs} setDocs={setDocs} />
      </div>
    </div>
  );
}
