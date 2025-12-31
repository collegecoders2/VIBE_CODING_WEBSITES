import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomById, getHotelById } from '../services/firebaseService';

function RoomDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [hotel, setHotel] = useState(null);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [nights, setNights] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const roomData = await getRoomById(id);
            if (roomData) {
                setRoom(roomData);
                const hotelData = await getHotelById(roomData.hotelId);
                setHotel(hotelData);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (checkIn && checkOut && room) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setNights(diffDays);
            setTotalPrice(diffDays * room.price);
        }
    }, [checkIn, checkOut, room]);

    const handleContinueToBooking = () => {
        if (!checkIn || !checkOut) {
            alert('Please select check-in and check-out dates');
            return;
        }
        if (new Date(checkIn) >= new Date(checkOut)) {
            alert('Check-out date must be after check-in date');
            return;
        }
        setShowBookingForm(true);
    };

    const handleBooking = (e) => {
        e.preventDefault();
        const bookingData = {
            checkIn,
            checkOut,
            guests,
            nights,
            totalPrice,
            room,
            hotel
        };
        navigate('/payment', { state: bookingData });
    };

    if (!room || !hotel) {
        return (
            <div className="mobile-container">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="mobile-container">
            <div className="page-container">
                {/* Header */}
                <div className="header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        ←
                    </button>
                    <h1>Book Room</h1>
                    <div style={{ width: '36px' }}></div>
                </div>

                {/* Room Image */}
                <div>
                    <img
                        src={room.image}
                        alt={room.type}
                        style={{
                            width: '100%',
                            height: '250px',
                            objectFit: 'cover'
                        }}
                    />
                </div>

                <div style={{ padding: '20px' }}>
                    {/* Room Info */}
                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
                            {room.type}
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                            {hotel.name}
                        </p>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            {room.description}
                        </p>
                    </div>

                    {/* Date Selection */}
                    {!showBookingForm ? (
                        <div>
                            <div className="card" style={{ background: 'var(--bg-light)' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                                    Select Dates
                                </h3>

                                <div className="form-group">
                                    <label className="form-label">Check-in Date</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        min={today}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Check-out Date</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        min={checkIn || today}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Number of Guests</label>
                                    <select
                                        className="form-input"
                                        value={guests}
                                        onChange={(e) => setGuests(Number(e.target.value))}
                                    >
                                        {[...Array(room.capacity)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {nights > 0 && (
                                    <div style={{
                                        background: 'white',
                                        padding: '16px',
                                        borderRadius: '8px',
                                        marginTop: '16px'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '8px',
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
                                            fontWeight: '700',
                                            fontSize: '18px'
                                        }}>
                                            <span>Total</span>
                                            <span className="price">${totalPrice}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                className="btn btn-primary btn-block"
                                onClick={handleContinueToBooking}
                                style={{ marginTop: '20px' }}
                            >
                                Continue to Booking
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="card" style={{ background: '#d1fae5', marginBottom: '20px' }}>
                                <div style={{ fontSize: '14px', color: '#065f46' }}>
                                    <strong>Booking Summary</strong><br />
                                    {nights} nights • {guests} guest(s)<br />
                                    {new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="card" style={{ background: 'var(--bg-light)' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                                    Confirm Booking
                                </h3>

                                <div style={{
                                    background: 'white',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    marginBottom: '20px'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '20px',
                                        fontWeight: '700'
                                    }}>
                                        <span>Total Amount</span>
                                        <span className="price">${totalPrice}</span>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary btn-block"
                                    onClick={handleBooking}
                                >
                                    Proceed to Payment
                                </button>

                                <button
                                    className="btn btn-secondary btn-block"
                                    onClick={() => setShowBookingForm(false)}
                                    style={{ marginTop: '12px' }}
                                >
                                    Change Dates
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RoomDetail;
