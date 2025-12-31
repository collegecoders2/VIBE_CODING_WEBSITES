import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthChange, getBookings, getUsers } from '../../services/firebaseService';

function ViewBookings() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (!user || user.role !== 'admin') {
                navigate('/login');
            } else {
                const fetchData = async () => {
                    const [bookingsData, usersData] = await Promise.all([getBookings(), getUsers()]);

                    // Sort by booking date, newest first
                    const sorted = bookingsData.sort((a, b) => {
                        const dateA = a.bookingDate?.toDate ? a.bookingDate.toDate() : new Date(a.bookingDate);
                        const dateB = b.bookingDate?.toDate ? b.bookingDate.toDate() : new Date(b.bookingDate);
                        return dateB - dateA;
                    });

                    setBookings(sorted);
                    setUsers(usersData);
                };
                fetchData();
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const getUserName = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.name : 'Unknown User';
    };

    const getUserEmail = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.email : 'Unknown';
    };

    return (
        <div className="mobile-container">
            <div className="page-container">
                <div className="header">
                    <button className="back-btn" onClick={() => navigate('/admin')}>
                        ←
                    </button>
                    <h1>All Bookings</h1>
                    <div style={{ width: '36px' }}></div>
                </div>

                <div style={{ padding: '20px' }}>
                    <div style={{
                        marginBottom: '20px',
                        color: 'var(--text-secondary)',
                        fontSize: '14px'
                    }}>
                        Total: {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
                    </div>

                    {bookings.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📋</div>
                            <p>No bookings yet</p>
                        </div>
                    ) : (
                        bookings.map(booking => {
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
                                    {/* Status and ID */}
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
                                            #{booking.id.toUpperCase().slice(0, 8)}
                                        </span>
                                    </div>

                                    {/* Customer Info */}
                                    <div style={{
                                        background: 'var(--bg-light)',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        marginBottom: '12px'
                                    }}>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                            Customer
                                        </div>
                                        <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                                            {getUserName(booking.userId)}
                                        </div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                            {getUserEmail(booking.userId)}
                                        </div>
                                    </div>

                                    {/* Hotel and Room */}
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
                                                {checkInDate.toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Check-out</span>
                                            <span style={{ fontWeight: '500' }}>
                                                {checkOutDate.toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>
                                                {booking.nights} nights • {booking.guests} guests
                                            </span>
                                            <span style={{ fontWeight: '700', color: 'var(--primary-color)' }}>
                                                ${booking.totalPrice}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Booking Date */}
                                    <div style={{
                                        fontSize: '12px',
                                        color: 'var(--text-secondary)',
                                        textAlign: 'right'
                                    }}>
                                        Booked: {(() => {
                                            const date = booking.bookingDate?.toDate ? booking.bookingDate.toDate() : new Date(booking.bookingDate);
                                            return date.toLocaleDateString();
                                        })()}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewBookings;
