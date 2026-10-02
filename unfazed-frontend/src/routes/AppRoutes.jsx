import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Therapist Dashboard & Practice Pages
import Dashboard from '../pages/therapist/Dashboard';
import Schedule from '../pages/therapist/Schedule';
import Clients from '../pages/therapist/Clients';
import Notes from '../pages/therapist/Notes';
import Analytics from '../pages/therapist/Analytics';

// Client & Public Pages
import Directory from '../pages/client/Directory';
import Profile from '../pages/client/Profile';
import Payment from '../pages/client/Payment';
import ClientPortal from '../pages/client/ClientPortal';

// Inlined Protected Route wrapper to eliminate missing file errors
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('unfazed_token');

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/directory" element={<Directory />} />
      <Route path="/pay" element={<Payment />} />
      <Route path="/portal" element={<ClientPortal />} />

      {/* Protected Therapist Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schedule"
        element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      {/* Public Practitioner Dynamic Profile URL */}
      <Route path="/:slug" element={<Profile />} />

      {/* Default Fallback */}
      <Route path="/" element={<Navigate to="/directory" replace />} />
      <Route path="*" element={<Navigate to="/directory" replace />} />
    </Routes>
  );
}