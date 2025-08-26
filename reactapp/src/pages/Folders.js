// src/pages/Folders.js
import React, { useState } from "react";
import "./Folders.css";

export default function Folders() {
  const [folders, setFolders] = useState([
    { id: 1, name: "Work Documents" },
    { id: 2, name: "Personal Files" },
    { id: 3, name: "Projects" },
  ]);
  const [newFolder, setNewFolder] = useState("");

  const handleAddFolder = () => {
    if (newFolder.trim() === "") return;
    const newEntry = {
      id: Date.now(),
      name: newFolder,
    };
    setFolders([...folders, newEntry]);
    setNewFolder("");
  };

  const handleDeleteFolder = (id) => {
    setFolders(folders.filter((folder) => folder.id !== id));
  };

  const handleRenameFolder = (id) => {
    const newName = prompt("Enter new folder name:");
    if (newName && newName.trim() !== "") {
      setFolders(
        folders.map((folder) =>
          folder.id === id ? { ...folder, name: newName } : folder
        )
      );
    }
  };

  return (
    <div className="folders-container">
      <h2>📂 Folder Management</h2>
      <p className="folders-intro">
        Create, rename, and organize your folders to manage documents effectively.
      </p>

      {/* New Folder Input */}
      <div className="folder-create">
        <input
          type="text"
          placeholder="Enter folder name..."
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value)}
        />
        <button className="btn primary" onClick={handleAddFolder}>
          ➕ Create Folder
        </button>
      </div>

      {/* Folder List */}
      <ul className="folder-list">
        {folders.map((folder) => (
          <li key={folder.id} className="folder-item">
            <span>📁 {folder.name}</span>
            <div className="folder-actions">
              <button onClick={() => handleRenameFolder(folder.id)}>✏ Rename</button>
              <button onClick={() => handleDeleteFolder(folder.id)}>🗑 Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
