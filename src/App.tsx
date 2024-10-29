import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthForm } from './components/AuthForm';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('authToken');
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthForm initialMode="login" />} />
          <Route path="/signup" element={<AuthForm initialMode="signup" />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}