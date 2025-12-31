import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthChange, logoutUser, getHotels, getRooms, getBookings, getUsers } from '../../services/firebaseService';

function AdminDashboard() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUserState] = useState(null);
    const [stats, setStats] = useState({
        hotels: 0,
        rooms: 0,
        bookings: 0,
        users: 0
    });

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (!user || user.role !== 'admin') {
                navigate('/login');
                return;
            }
            setCurrentUserState(user);

            const fetchStats = async () => {
                const [hotels, rooms, bookings, users] = await Promise.all([
                    getHotels(),
                    getRooms(),
                    getBookings(),
                    getUsers()
                ]);

                setStats({
                    hotels: hotels.length,
                    rooms: rooms.length,
                    bookings: bookings.length,
                    users: users.filter(u => u.role === 'user').length
                });
            };
            fetchStats();
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        await logoutUser();
        navigate('/login');
    };

    if (!currentUser) return null;

    return (
        <div className="mobile-container">
            <div className="page-container">
                {/* Header */}
                <div className="header">
                    <div>
                        <h1>👨‍💼 Admin Panel</h1>
                        <p style={{ fontSize: '12px', opacity: 0.9, marginTop: '4px' }}>
                            Welcome, {currentUser.name}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        Logout
                    </button>
                </div>

                <div style={{ padding: '20px' }}>
                    {/* Stats Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '16px',
                        marginBottom: '24px'
                    }}>
                        <div className="card" style={{
                            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px' }}>
                                {stats.hotels}
                            </div>
                            <div style={{ fontSize: '14px', opacity: 0.9 }}>Hotels</div>
                        </div>

                        <div className="card" style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px' }}>
                                {stats.rooms}
                            </div>
                            <div style={{ fontSize: '14px', opacity: 0.9 }}>Rooms</div>
                        </div>

                        <div className="card" style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px' }}>
                                {stats.bookings}
                            </div>
                            <div style={{ fontSize: '14px', opacity: 0.9 }}>Bookings</div>
                        </div>

                        <div className="card" style={{
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px' }}>
                                {stats.users}
                            </div>
                            <div style={{ fontSize: '14px', opacity: 0.9 }}>Users</div>
                        </div>
                    </div>

                    {/* Management Options */}
                    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                        Management
                    </h2>

                    <Link to="/admin/hotels" style={{ textDecoration: 'none' }}>
                        <div className="card" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px'
                                }}>
                                    🏨
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '2px' }}>
                                        Manage Hotels
                                    </div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                        Add, edit, or delete hotels
                                    </div>
                                </div>
                            </div>
                            <span style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>→</span>
                        </div>
                    </Link>

                    <Link to="/admin/rooms" style={{ textDecoration: 'none' }}>
                        <div className="card" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px'
                                }}>
                                    🛏️
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '2px' }}>
                                        Manage Rooms
                                    </div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                        Add, edit, or delete rooms
                                    </div>
                                </div>
                            </div>
                            <span style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>→</span>
                        </div>
                    </Link>

                    <Link to="/admin/bookings" style={{ textDecoration: 'none' }}>
                        <div className="card" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px'
                                }}>
                                    📋
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '2px' }}>
                                        View Bookings
                                    </div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                        See all customer bookings
                                    </div>
                                </div>
                            </div>
                            <span style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>→</span>
                        </div>
                    </Link>

                    <Link to="/admin/users" style={{ textDecoration: 'none' }}>
                        <div className="card" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px'
                                }}>
                                    👥
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '2px' }}>
                                        View Users
                                    </div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                        See all registered users
                                    </div>
                                </div>
                            </div>
                            <span style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>→</span>
                        </div>
                    </Link>
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
                    <Link to="/profile" className="nav-item">
                        <span className="nav-icon">👤</span>
                        <span>Profile</span>
                    </Link>
                    <Link to="/admin" className="nav-item active">
                        <span className="nav-icon">🛡️</span>
                        <span>Admin</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
