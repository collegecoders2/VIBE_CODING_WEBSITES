import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHotelById, getRoomsByHotelId } from '../services/firebaseService';

function HotelDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const hotelData = await getHotelById(id);
            if (hotelData) {
                setHotel(hotelData);
                const roomsData = await getRoomsByHotelId(id);
                setRooms(roomsData);
            }
        };
        fetchData();
    }, [id]);

    if (!hotel) {
        return (
            <div className="mobile-container">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="mobile-container">
            <div className="page-container">
                {/* Header */}
                <div className="header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        ←
                    </button>
                    <h1>Hotel Details</h1>
                    <div style={{ width: '36px' }}></div>
                </div>

                {/* Hotel Image */}
                <div style={{ position: 'relative' }}>
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        style={{
                            width: '100%',
                            height: '250px',
                            objectFit: 'cover'
                        }}
                    />
                </div>

                {/* Hotel Info */}
                <div style={{ padding: '20px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>
                        {hotel.name}
                    </h2>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--text-secondary)',
                        fontSize: '15px',
                        marginBottom: '16px'
                    }}>
                        <span>📍</span>
                        <span>{hotel.location}</span>
                    </div>

                    <div className="card" style={{ background: 'var(--bg-light)', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                            About
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            {hotel.description}
                        </p>
                    </div>

                    {/* Amenities */}
                    <div className="card" style={{ background: 'var(--bg-light)', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                            Amenities
                        </h3>
                        <div className="amenities-list">
                            {hotel.amenities.map((amenity, index) => (
                                <div key={index} className="amenity-tag">
                                    <span>✓</span>
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rooms */}
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                            Available Rooms
                        </h3>

                        {rooms.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state-icon">🚫</div>
                                <p>No rooms available</p>
                            </div>
                        ) : (
                            rooms.map(room => (
                                <div
                                    key={room.id}
                                    className="card"
                                    onClick={() => navigate(`/room/${room.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        src={room.image}
                                        alt={room.type}
                                        className="room-image"
                                    />

                                    <h4 style={{
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        marginTop: '12px',
                                        marginBottom: '8px'
                                    }}>
                                        {room.type}
                                    </h4>

                                    <p style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '14px',
                                        marginBottom: '12px'
                                    }}>
                                        {room.description}
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginBottom: '12px',
                                        color: 'var(--text-secondary)',
                                        fontSize: '14px'
                                    }}>
                                        <span>👥</span>
                                        <span>Up to {room.capacity} guests</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingTop: '12px',
                                        borderTop: '1px solid var(--border-color)'
                                    }}>
                                        <div className="price">
                                            ${room.price}
                                            <span className="price-small"> /night</span>
                                        </div>

                                        <div style={{
                                            background: 'var(--primary-color)',
                                            color: 'white',
                                            padding: '8px 16px',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            fontWeight: '600'
                                        }}>
                                            Book Now →
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HotelDetail;
