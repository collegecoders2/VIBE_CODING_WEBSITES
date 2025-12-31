import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getHotels, onAuthChange, logoutUser } from '../services/firebaseService';

function Home() {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [currentUser, setCurrentUserState] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (user) {
                setCurrentUserState(user);
                const fetchHotels = async () => {
                    const data = await getHotels();
                    setHotels(data);
                };
                fetchHotels();
            } else {
                navigate('/login');
            }
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
                        <h1>🏨 Hotels</h1>
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

                {/* Search Bar */}
                <div style={{ padding: '20px', background: 'white', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--bg-light)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        gap: '12px'
                    }}>
                        <span style={{ fontSize: '20px' }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search hotels..."
                            style={{
                                border: 'none',
                                background: 'transparent',
                                outline: 'none',
                                flex: 1,
                                fontSize: '16px'
                            }}
                        />
                    </div>
                </div>

                {/* Hotels List */}
                <div style={{ padding: '20px' }}>
                    <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
                        Popular Hotels
                    </h2>

                    {hotels.map(hotel => (
                        <div
                            key={hotel.id}
                            className="card"
                            onClick={() => navigate(`/hotel/${hotel.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="hotel-image"
                            />

                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                                {hotel.name}
                            </h3>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: 'var(--text-secondary)',
                                fontSize: '14px',
                                marginBottom: '12px'
                            }}>
                                <span>📍</span>
                                <span>{hotel.location}</span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                        Starting from
                                    </div>
                                    <div className="price">
                                        ${hotel.startingPrice}
                                        <span className="price-small"> /night</span>
                                    </div>
                                </div>

                                <div style={{
                                    background: 'var(--primary-color)',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}>
                                    View Details →
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Navigation */}
                <div className="bottom-nav">
                    <Link to="/" className="nav-item active">
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

export default Home;
