import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeFirestoreData } from './services/firebaseService';

// User Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import HotelDetail from './pages/HotelDetail';
import RoomDetail from './pages/RoomDetail';
import Payment from './pages/Payment';
import BookingSuccess from './pages/BookingSuccess';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageHotels from './pages/admin/ManageHotels';
import ManageRooms from './pages/admin/ManageRooms';
import ViewBookings from './pages/admin/ViewBookings';
import ViewUsers from './pages/admin/ViewUsers';

function App() {
  useEffect(() => {
    // Initialize Firestore data on first load
    initializeFirestoreData();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/hotels" element={<ManageHotels />} />
        <Route path="/admin/rooms" element={<ManageRooms />} />
        <Route path="/admin/bookings" element={<ViewBookings />} />
        <Route path="/admin/users" element={<ViewUsers />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
