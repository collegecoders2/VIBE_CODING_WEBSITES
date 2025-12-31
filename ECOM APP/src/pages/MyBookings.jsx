import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getBookingsByUserId, onAuthChange } from '../services/firebaseService';

function MyBookings() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [currentUser, setCurrentUserState] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (user) {
                setCurrentUserState(user);
                const fetchBookings = async () => {
                    const userBookings = await getBookingsByUserId(user.id);
                    // Sort by booking date, newest first
                    const sorted = userBookings.sort((a, b) => {
                        const dateA = a.bookingDate?.toDate ? a.bookingDate.toDate() : new Date(a.bookingDate);
                        const dateB = b.bookingDate?.toDate ? b.bookingDate.toDate() : new Date(b.bookingDate);
                        return dateB - dateA;
                    });
                    setBookings(sorted);
                };
                fetchBookings();
            } else {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    if (!currentUser) return null;

    return (
        <div className="mobile-container">
            <div className="page-container">
                {/* Header */}
                <div className="header">
                    <button className="back-btn" onClick={() => navigate('/')}>
                        ←
                    </button>
                    <h1>My Bookings</h1>
                    <div style={{ width: '36px' }}></div>
                </div>

                <div style={{ padding: '20px' }}>
                    {bookings.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📋</div>
                            <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>No Bookings Yet</h3>
                            <p style={{ marginBottom: '24px' }}>Start exploring and book your perfect stay!</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/')}
                            >
                                Browse Hotels
                            </button>
                        </div>
                    ) : (
                        <>
                            <div style={{
                                marginBottom: '20px',
                                color: 'var(--text-secondary)',
                                fontSize: '14px'
                            }}>
                                {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'} found
                            </div>

                            {bookings.map(booking => {
                                const checkInDate = new Date(booking.checkIn);
                                const checkOutDate = new Date(booking.checkOut);
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);

                                let status = 'upcoming';
                                let statusColor = '#10b981';
                                let statusBg = '#d1fae5';

                                if (checkOutDate < today) {
                                    status = 'completed';
                                    statusColor = '#6b7280';
                                    statusBg = '#f3f4f6';
                                } else if (checkInDate <= today && checkOutDate >= today) {
                                    status = 'active';
                                    statusColor = '#2563eb';
                                    statusBg = '#dbeafe';
                                }

                                return (
                                    <div key={booking.id} className="card">
                                        {/* Status Badge */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '12px'
                                        }}>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                background: statusBg,
                                                color: statusColor,
                                                textTransform: 'capitalize'
                                            }}>
                                                {status}
                                            </span>
                                            <span style={{
                                                fontSize: '12px',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                ID: #{booking.id.toUpperCase().slice(0, 8)}
                                            </span>
                                        </div>

                                        {/* Hotel Info */}
                                        <h3 style={{
                                            fontSize: '18px',
                                            fontWeight: '700',
                                            marginBottom: '4px'
                                        }}>
                                            {booking.hotelName}
                                        </h3>
                                        <div style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: '14px',
                                            marginBottom: '16px'
                                        }}>
                                            {booking.roomType}
                                        </div>

                                        {/* Booking Details */}
                                        <div style={{
                                            display: 'grid',
                                            gap: '8px',
                                            padding: '12px',
                                            background: 'var(--bg-light)',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            marginBottom: '12px'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>Check-in</span>
                                                <span style={{ fontWeight: '500' }}>
                                                    {checkInDate.toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>Check-out</span>
                                                <span style={{ fontWeight: '500' }}>
                                                    {checkOutDate.toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>
                                                    {booking.nights} {booking.nights === 1 ? 'night' : 'nights'} • {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                                                </span>
                                                <span style={{ fontWeight: '700', color: 'var(--primary-color)' }}>
                                                    ${booking.totalPrice}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Booked Date */}
                                        <div style={{
                                            fontSize: '12px',
                                            color: 'var(--text-secondary)',
                                            textAlign: 'right'
                                        }}>
                                            Booked on {(() => {
                                                const date = booking.bookingDate?.toDate ? booking.bookingDate.toDate() : new Date(booking.bookingDate);
                                                return date.toLocaleDateString();
                                            })()}
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>

                {/* Bottom Navigation */}
                <div className="bottom-nav">
                    <Link to="/" className="nav-item">
                        <span className="nav-icon">🏠</span>
                        <span>Home</span>
                    </Link>
                    <Link to="/bookings" className="nav-item active">
                        <span className="nav-icon">📋</span>
                        <span>Bookings</span>
                    </Link>
                    <Link to="/profile" className="nav-item">
                        <span className="nav-icon">👤</span>
                        <span>Profile</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MyBookings;
