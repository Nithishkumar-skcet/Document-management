import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import DocumentDetailsPage from "./pages/DocumentDetailsPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import DocumentsPage from "./pages/DocumentsPage";
import Folders from "./pages/Folders";
import Search from "./pages/Search";
import ActivityLogs from "./pages/ActivityLogs";
import VisibilityControl from "./pages/VisibilityControl";
import SharingPermissions from "./pages/SharingPermissions";
import OwnershipTracking from "./pages/OwnershipTracking";
import Archive from "./pages/Archive";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route path="/" element={<RegisterPage />} />
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/document/:id"
            element={
              <ProtectedRoute>
                <DocumentDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
        path="/profile"
         element={
          <ProtectedRoute>
             <ProfilePage />
              </ProtectedRoute>
                  }
/>
 <Route path="/profile" element={<ProfilePage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/folders" element={<Folders />} />
        <Route path="/search" element={<Search />} />
        <Route path="/activity" element={<ActivityLogs />} />
        <Route path="/visibility" element={<VisibilityControl />} />
        <Route path="/sharing" element={<SharingPermissions />} />
        <Route path="/ownership" element={<OwnershipTracking />} />
        <Route path="/archive" element={<Archive />} />






<Route 
  path="/documents" 
  element={
    <ProtectedRoute>
      <DocumentsPage />
    </ProtectedRoute>
  } 
/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
