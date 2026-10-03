import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/StudentDashboard';
import LecturerDashboard from './pages/LecturerDashboard';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'student' ? '/student' : '/lecturer'} replace />;
  }

  return children;
};

// Main Routing
function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Home Page always renders at the root */}
      <Route path="/" element={<HomePage />} />
      
      {/* Auth page redirects to active dashboard ONLY if already signed in */}
      <Route 
        path="/auth" 
        element={user ? <Navigate to={user.role === 'student' ? '/student' : '/lecturer'} replace /> : <AuthPage />} 
      />
      
      {/* Protected Role Dashboards */}
      <Route 
        path="/student" 
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/lecturer" 
        element={
          <ProtectedRoute allowedRole="lecturer">
            <LecturerDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback back to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}