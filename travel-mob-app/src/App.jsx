import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Success from './pages/Success';
import MyBookings from './pages/MyBookings';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Setup from './pages/Setup';
import BottomNav from './components/BottomNav';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return <Navigate to="/home" />;
  return children;
};

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const hideNav = ['/', '/login', '/signup', '/payment', '/success'];
  const showNav = !hideNav.includes(location.pathname) && !location.pathname.startsWith('/booking');

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />

        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/trip/:id" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
        <Route path="/booking/:id" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
        <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/setup" element={<Setup />} />
      </Routes>

      {user && showNav && <BottomNav />}
    </>
  );
}

export default App;
