import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Ticket, User, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <nav className="bottom-nav">
            <NavLink
                to="/home"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
                <Home size={24} />
                <span>Explore</span>
            </NavLink>

            <NavLink
                to="/my-bookings"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
                <Ticket size={24} />
                <span>Trips</span>
            </NavLink>

            {user.role === 'admin' && (
                <NavLink
                    to="/admin"
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                    <Settings size={24} />
                    <span>Admin</span>
                </NavLink>
            )}

            <NavLink
                to="/profile"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
                <User size={24} />
                <span>Profile</span>
            </NavLink>
        </nav>
    );
};

export default BottomNav;
