import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './auth/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import Profile from './pages/Profile';
import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* public route */}
          <Route path="/login" element={<Login />} />

          {/* protected route */}
          <Route
            path="/me"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* fallback / default */}
          <Route
            path="/"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold">
                  Hello, frontend is alive! 🎉
                </h1>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}