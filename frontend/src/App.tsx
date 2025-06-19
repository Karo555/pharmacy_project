// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';

import Home from './pages/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Profile from './pages/Dashboard/Profile';
import Dashboard from './pages/Dashboard/Dashboard';

import DrugListPage from './pages/Drugs/DrugListPage';
import DrugDetailPage from './pages/Drugs/DrugDetailPage';
import PrescriptionListPage from './pages/Prescriptions/PrescriptionListPage';
import PrescriptionDetailPage from './pages/Prescriptions/PrescriptionDetailPage';

// Create a theme instance
const theme = createTheme({
    typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    palette: {
        primary: {
            main: '#0a6cce',
        },
        secondary: {
            main: '#6a00ea',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '28px',
                },
            },
        },
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <Layout>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />

                            {/* Drug catalog (public) */}
                            <Route path="/drugs" element={<DrugListPage />} />
                            <Route path="/drugs/:id" element={<DrugDetailPage />} />

                            {/* Prescriptions (requires login) */}
                            <Route
                                path="/prescriptions"
                                element={
                                    <ProtectedRoute>
                                        <PrescriptionListPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/prescriptions/:id"
                                element={
                                    <ProtectedRoute>
                                        <PrescriptionDetailPage />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Other protected routes */}
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <Profile />
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

                            {/* Fallback */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Layout>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;