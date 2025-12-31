import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthChange, getUsers, getBookings } from '../../services/firebaseService';

function ViewUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (!user || user.role !== 'admin') {
                navigate('/login');
            } else {
                const fetchData = async () => {
                    const [usersData, bookingsData] = await Promise.all([getUsers(), getBookings()]);
                    setUsers(usersData.filter(u => u.role === 'user'));
                    setBookings(bookingsData);
                };
                fetchData();
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const getUserBookingsCount = (userId) => {
        return bookings.filter(b => b.userId === userId).length;
    };

    return (
        <div className="mobile-container">
            <div className="page-container">
                <div className="header">
                    <button className="back-btn" onClick={() => navigate('/admin')}>
                        ←
                    </button>
                    <h1>All Users</h1>
                    <div style={{ width: '36px' }}></div>
                </div>

                <div style={{ padding: '20px' }}>
                    <div style={{
                        marginBottom: '20px',
                        color: 'var(--text-secondary)',
                        fontSize: '14px'
                    }}>
                        Total: {users.length} registered {users.length === 1 ? 'user' : 'users'}
                    </div>

                    {users.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">👥</div>
                            <p>No users registered yet</p>
                        </div>
                    ) : (
                        users.map(user => {
                            const bookingsCount = getUserBookingsCount(user.id);

                            return (
                                <div key={user.id} className="card">
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px'
                                    }}>
                                        {/* Avatar */}
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            flexShrink: 0
                                        }}>
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>

                                        {/* User Info */}
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{
                                                fontSize: '18px',
                                                fontWeight: '600',
                                                marginBottom: '4px'
                                            }}>
                                                {user.name}
                                            </h3>

                                            <div style={{
                                                fontSize: '14px',
                                                color: 'var(--text-secondary)',
                                                marginBottom: '8px'
                                            }}>
                                                📧 {user.email}
                                            </div>

                                            <div style={{
                                                fontSize: '14px',
                                                color: 'var(--text-secondary)',
                                                marginBottom: '8px'
                                            }}>
                                                📱 {user.phone}
                                            </div>

                                            <div style={{
                                                display: 'inline-block',
                                                padding: '4px 12px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                background: bookingsCount > 0 ? '#d1fae5' : '#f3f4f6',
                                                color: bookingsCount > 0 ? '#065f46' : '#6b7280'
                                            }}>
                                                {bookingsCount} {bookingsCount === 1 ? 'booking' : 'bookings'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* User ID */}
                                    <div style={{
                                        marginTop: '12px',
                                        paddingTop: '12px',
                                        borderTop: '1px solid var(--border-color)',
                                        fontSize: '12px',
                                        color: 'var(--text-secondary)',
                                        textAlign: 'right'
                                    }}>
                                        User ID: {user.id}
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

export default ViewUsers;
