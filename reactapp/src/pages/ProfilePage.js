import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./ProfilePage.css";
export default function ProfilePage() {
  const { user, updateProfile, changePassword } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-section">
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} />
        <button onClick={() => updateProfile(name)}>Save</button>
      </div>

      <hr />

      <div className="profile-section">
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        <button onClick={() => changePassword(currentPassword, newPassword)}>
          Change
        </button>
      </div>
    </div>
  );
}
