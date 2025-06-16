import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
// @ts-ignore
import Dashboard from '../pages/Dashboard/Dashboard';
// @ts-ignore
import ProtectedRoute from './ProtectedRoute'; // your auth-guard
import Drugs from '../pages/Drugs/Drugs';
import DrugDetail from '../pages/Drugs/DrugDetail';

const AppRouter: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/drugs"
                    element={
                      <ProtectedRoute>
                            <Drugs />
                          </ProtectedRoute>
                    }
                  />

            <Route
                  path="/drugs/:id"
                  element={
                    <ProtectedRoute>
                          <DrugDetail />
                        </ProtectedRoute>
                  }
                />

            {/* any other route not matched by API or static assets */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;