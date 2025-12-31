import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function BookingSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state;

    useEffect(() => {
        if (!booking) {
            navigate('/');
        }
    }, [booking, navigate]);

    if (!booking) return null;

    return (
        <div className="mobile-container">
            <div className="page-container" style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <div style={{ width: '100%', maxWidth: '350px' }}>
                    {/* Success Animation */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '32px'
                    }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            background: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px',
                            fontSize: '48px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            animation: 'scaleIn 0.5s ease-out'
                        }}>
                            ✓
                        </div>
                        <h1 style={{
                            color: 'white',
                            fontSize: '28px',
                            fontWeight: '700',
                            marginBottom: '8px'
                        }}>
                            Booking Confirmed!
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                            Your reservation has been successfully made
                        </p>
                    </div>

                    {/* Booking Details Card */}
                    <div className="card" style={{ padding: '24px', marginBottom: '20px' }}>
                        <div style={{
                            textAlign: 'center',
                            paddingBottom: '16px',
                            marginBottom: '16px',
                            borderBottom: '2px dashed var(--border-color)'
                        }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                Booking ID
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)' }}>
                                #{booking.id.toUpperCase().slice(0, 8)}
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                                {booking.hotelName}
                            </h3>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                {booking.roomType}
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gap: '12px',
                            padding: '16px',
                            background: 'var(--bg-light)',
                            borderRadius: '8px',
                            marginBottom: '20px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                    📅 Check-in
                                </span>
                                <span style={{ fontWeight: '600' }}>
                                    {new Date(booking.checkIn).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                    📅 Check-out
                                </span>
                                <span style={{ fontWeight: '600' }}>
                                    {new Date(booking.checkOut).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                    🌙 Nights
                                </span>
                                <span style={{ fontWeight: '600' }}>{booking.nights}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                    👥 Guests
                                </span>
                                <span style={{ fontWeight: '600' }}>{booking.guests}</span>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '16px',
                            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                            borderRadius: '8px',
                            color: 'white'
                        }}>
                            <span style={{ fontSize: '16px', fontWeight: '600' }}>Total Paid</span>
                            <span style={{ fontSize: '24px', fontWeight: '700' }}>${booking.totalPrice}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <button
                        className="btn btn-primary btn-block"
                        onClick={() => navigate('/bookings')}
                        style={{ marginBottom: '12px', background: 'white', color: 'var(--success-color)' }}
                    >
                        View My Bookings
                    </button>

                    <button
                        className="btn btn-secondary btn-block"
                        onClick={() => navigate('/')}
                        style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white' }}
                    >
                        Back to Home
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
}

export default BookingSuccess;
