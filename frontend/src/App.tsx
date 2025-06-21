// src/App.tsx

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CounterProvider } from './contexts/CounterContext';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/redux/store';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/Error/ErrorBoundary';
import Spinner from './components/ui/Spinner';

// Eagerly loaded home page for better initial load experience
import Home from './pages/Home';

// Lazy load all other pages
const Register = lazy(() => import(/* webpackPrefetch: true */ './pages/Auth/Register'));
const Login = lazy(() => import(/* webpackPrefetch: true */ './pages/Auth/Login'));
const Profile = lazy(() => import('./pages/Dashboard/Profile'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const NotFound = lazy(() => import('./pages/NotFound'));
const StateManagementDemo = lazy(() => import('./pages/StateManagementDemo'));

const DrugListPage = lazy(() => import(/* webpackPrefetch: true */ './pages/Drugs/DrugListPage'));
const DrugDetailPage = lazy(() => import('./pages/Drugs/DrugDetailPage'));
const PrescriptionListPage = lazy(() => import('./pages/Prescriptions/PrescriptionListPage'));
const PrescriptionDetailPage = lazy(() => import('./pages/Prescriptions/PrescriptionDetailPage'));

// Loading fallback for Suspense
const SuspenseFallback = () => (
  <Spinner fullScreen text="Loading..." transparent size={50} />
);

const App: React.FC = () => {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider>
                <CssBaseline />
                <AuthProvider>
                    <CounterProvider>
                        <ErrorBoundary>
                            <Router>
                                <Layout>
                                    {/* Toast notification container */}
                                    <Toaster
                                        position="top-right"
                                        toastOptions={{
                                            duration: 4000,
                                            style: {
                                                background: '#fff',
                                                color: '#333',
                                            },
                                            success: {
                                                iconTheme: {
                                                    primary: '#4caf50',
                                                    secondary: '#fff',
                                                },
                                            },
                                            error: {
                                                iconTheme: {
                                                    primary: '#f44336',
                                                    secondary: '#fff',
                                                },
                                            },
                                        }}
                                    />
                                    <ErrorBoundary>
                                        <Suspense fallback={<SuspenseFallback />}>
                                            <Routes>
                                                {/* Public routes */}
                                                <Route path="/" element={<Home />} />
                                                <Route path="/register" element={<Register />} />
                                                <Route path="/login" element={<Login />} />
                                                <Route path="/search" element={<SearchResults />} />
                                                <Route path="/state-demo" element={<StateManagementDemo />} />

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

                                                {/* Fallback - 404 Not Found */}
                                                <Route path="*" element={<NotFound />} />
                                            </Routes>
                                        </Suspense>
                                    </ErrorBoundary>
                                </Layout>
                            </Router>
                        </ErrorBoundary>
                    </CounterProvider>
                </AuthProvider>
            </ThemeProvider>
        </ReduxProvider>
    );
};

export default App;