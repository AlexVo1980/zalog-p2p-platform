import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import BorrowerDashboard from './pages/dashboards/BorrowerDashboard';
import InvestorDashboard from './pages/dashboards/InvestorDashboard';
import BrokerDashboard from './pages/dashboards/BrokerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import LegalSupport from './pages/LegalSupport';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

function AppContent() {
  const { user, loading } = useAuth();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/legal" element={<LegalSupport />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard/borrower"
              element={
                <ProtectedRoute requiredRole="borrower">
                  <BorrowerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/investor"
              element={
                <ProtectedRoute requiredRole="investor">
                  <InvestorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/broker"
              element={
                <ProtectedRoute requiredRole="broker">
                  <BrokerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

