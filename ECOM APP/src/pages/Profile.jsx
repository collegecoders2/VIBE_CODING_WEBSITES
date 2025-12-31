import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthChange, logoutUser, getBookingsByUserId } from '../services/firebaseService';

function Profile() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUserState] = useState(null);
    const [bookingsCount, setBookingsCount] = useState(0);

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (user) {
                setCurrentUserState(user);
                const fetchBookings = async () => {
                    const userBookings = await getBookingsByUserId(user.id);
                    setBookingsCount(userBookings.length);
                };
                fetchBookings();
            } else {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to logout?')) {
            await logoutUser();
            navigate('/login');
        }
    };

    if (!currentUser) return null;

    return (
        <div className="mobile-container">
            <div className="page-container">
                {/* Header */}
                <div className="header">
                    <button className="back-btn" onClick={() => navigate('/')}>
                        ←
                    </button>
                    <h1>Profile</h1>
                    <div style={{ width: '36px' }}></div>
                </div>

                <div style={{ padding: '20px' }}>
                    {/* Profile Card */}
                    <div className="card" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '48px',
                            fontWeight: '700',
                            margin: '0 auto 20px'
                        }}>
                            {currentUser.name.charAt(0).toUpperCase()}
                        </div>

                        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
                            {currentUser.name}
                        </h2>

                        <div style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            background: currentUser.role === 'admin' ? '#fef3c7' : '#dbeafe',
                            color: currentUser.role === 'admin' ? '#92400e' : '#1e40af',
                            textTransform: 'capitalize',
                            marginBottom: '20px'
                        }}>
                            {currentUser.role}
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                            Account Information
                        </h3>

                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                    Email
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: '500' }}>
                                    📧 {currentUser.email}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                    Phone
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: '500' }}>
                                    📱 {currentUser.phone}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                    User ID
                                </div>
                                <div style={{ fontSize: '14px', fontWeight: '500', fontFamily: 'monospace' }}>
                                    {currentUser.id}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                            Booking Statistics
                        </h3>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px',
                            background: 'var(--bg-light)',
                            borderRadius: '8px'
                        }}>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                    Total Bookings
                                </div>
                                <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-color)' }}>
                                    {bookingsCount}
                                </div>
                            </div>
                            <div style={{ fontSize: '48px' }}>📋</div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                            Quick Actions
                        </h3>

                        <Link to="/bookings" style={{ textDecoration: 'none' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px',
                                background: 'var(--bg-light)',
                                borderRadius: '8px',
                                marginBottom: '12px',
                                cursor: 'pointer'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '24px' }}>📋</span>
                                    <span style={{ fontWeight: '500' }}>My Bookings</span>
                                </div>
                                <span style={{ color: 'var(--text-secondary)' }}>→</span>
                            </div>
                        </Link>

                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px',
                                background: 'var(--bg-light)',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '24px' }}>🏨</span>
                                    <span style={{ fontWeight: '500' }}>Browse Hotels</span>
                                </div>
                                <span style={{ color: 'var(--text-secondary)' }}>→</span>
                            </div>
                        </Link>

                        {currentUser.role === 'admin' && (
                            <Link to="/admin" style={{ textDecoration: 'none' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px',
                                    background: 'var(--bg-light)',
                                    borderRadius: '8px',
                                    marginTop: '12px',
                                    cursor: 'pointer'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '24px' }}>🛡️</span>
                                        <span style={{ fontWeight: '500' }}>Admin Dashboard</span>
                                    </div>
                                    <span style={{ color: 'var(--text-secondary)' }}>→</span>
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Logout Button */}
                    <button
                        className="btn btn-danger btn-block"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>
                </div>

                {/* Bottom Navigation */}
                <div className="bottom-nav">
                    <Link to="/" className="nav-item">
                        <span className="nav-icon">🏠</span>
                        <span>Home</span>
                    </Link>
                    <Link to="/bookings" className="nav-item">
                        <span className="nav-icon">📋</span>
                        <span>Bookings</span>
                    </Link>
                    <Link to="/profile" className="nav-item active">
                        <span className="nav-icon">👤</span>
                        <span>Profile</span>
                    </Link>
                    {currentUser.role === 'admin' && (
                        <Link to="/admin" className="nav-item">
                            <span className="nav-icon">🛡️</span>
                            <span>Admin</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
