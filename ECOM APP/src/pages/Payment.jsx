import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addBooking, generateId, onAuthChange } from '../services/firebaseService';

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state;
    const [enteredAmount, setEnteredAmount] = useState('');
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (user) setCurrentUser(user);
            else navigate('/login');
        });
        return () => unsubscribe();
    }, [navigate]);

    if (!bookingData) {
        navigate('/');
        return null;
    }

    const { checkIn, checkOut, guests, nights, totalPrice, room, hotel } = bookingData;

    const handlePayment = async (e) => {
        e.preventDefault();
        setError('');

        const amount = parseFloat(enteredAmount);

        if (isNaN(amount)) {
            setError('Please enter a valid amount');
            return;
        }

        if (amount !== totalPrice) {
            setError(`Amount must be exactly $${totalPrice}`);
            return;
        }

        // Create booking
        if (!currentUser) {
            setError('Please login to continue');
            return;
        }

        const booking = {
            id: generateId(),
            userId: currentUser.id,
            hotelId: hotel.id,
            roomId: room.id,
            hotelName: hotel.name,
            roomType: room.type,
            checkIn,
            checkOut,
            guests,
            nights,
            totalPrice,
            status: 'confirmed',
            // bookingDate will be set by serverTimestamp in addBooking service
        };

        await addBooking(booking);
        navigate('/booking-success', { state: booking });
    };

    return (
        <div className="mobile-container">
            <div className="page-container">
                {/* Header */}
                <div className="header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        ←
                    </button>
                    <h1>Payment</h1>
                    <div style={{ width: '36px' }}></div>
                </div>

                <div style={{ padding: '20px' }}>
                    {/* Booking Summary */}
                    <div className="card" style={{ background: 'var(--bg-light)', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                            Booking Summary
                        </h3>

                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                                {hotel.name}
                            </div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                {room.type}
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gap: '8px',
                            padding: '12px',
                            background: 'white',
                            borderRadius: '8px',
                            fontSize: '14px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Check-in</span>
                                <span style={{ fontWeight: '500' }}>
                                    {new Date(checkIn).toLocaleDateString()}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Check-out</span>
                                <span style={{ fontWeight: '500' }}>
                                    {new Date(checkOut).toLocaleDateString()}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Guests</span>
                                <span style={{ fontWeight: '500' }}>{guests}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Nights</span>
                                <span style={{ fontWeight: '500' }}>{nights}</span>
                            </div>
                        </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="card" style={{ background: 'var(--bg-light)', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                            Price Details
                        </h3>

                        <div style={{
                            background: 'white',
                            padding: '16px',
                            borderRadius: '8px'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px',
                                color: 'var(--text-secondary)'
                            }}>
                                <span>${room.price} × {nights} nights</span>
                                <span>${room.price * nights}</span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingTop: '12px',
                                borderTop: '2px solid var(--border-color)',
                                fontSize: '20px',
                                fontWeight: '700'
                            }}>
                                <span>Total Amount</span>
                                <span className="price">${totalPrice}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="card" style={{ background: 'var(--bg-light)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                            💳 Payment
                        </h3>

                        <div style={{
                            background: '#fef3c7',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '16px',
                            fontSize: '13px',
                            color: '#92400e'
                        }}>
                            <strong>Demo Payment:</strong> Enter the exact amount of ${totalPrice} to confirm your booking.
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handlePayment}>
                            <div className="form-group">
                                <label className="form-label">Enter Amount ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-input"
                                    value={enteredAmount}
                                    onChange={(e) => setEnteredAmount(e.target.value)}
                                    placeholder={`Enter $${totalPrice}`}
                                    required
                                    style={{ fontSize: '18px', fontWeight: '600' }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success btn-block"
                                style={{ marginTop: '20px' }}
                            >
                                Confirm Payment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
