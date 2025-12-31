import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthChange, getRooms, getHotels, addRoom, updateRoom, deleteRoom } from '../../services/firebaseService';

function ManageRooms() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [formData, setFormData] = useState({
        hotelId: '',
        type: '',
        price: '',
        description: '',
        image: '',
        capacity: '2'
    });

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (!user || user.role !== 'admin') {
                navigate('/login');
            } else {
                loadData();
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const loadData = async () => {
        const [roomsData, hotelsData] = await Promise.all([getRooms(), getHotels()]);
        setRooms(roomsData);
        setHotels(hotelsData);
    };

    const getHotelName = (hotelId) => {
        const hotel = hotels.find(h => h.id === hotelId);
        return hotel ? hotel.name : 'Unknown Hotel';
    };

    const handleEdit = (room) => {
        setEditingRoom(room);
        setFormData({
            hotelId: room.hotelId,
            type: room.type,
            price: room.price,
            description: room.description,
            image: room.image,
            capacity: room.capacity
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            await deleteRoom(id);
            loadData();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const roomData = {
            hotelId: formData.hotelId,
            type: formData.type,
            price: parseFloat(formData.price),
            description: formData.description,
            image: formData.image,
            capacity: parseInt(formData.capacity)
        };

        if (editingRoom) {
            await updateRoom(editingRoom.id, roomData);
        } else {
            await addRoom(roomData);
        }

        handleCancel();
        loadData();
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingRoom(null);
        setFormData({
            hotelId: '',
            type: '',
            price: '',
            description: '',
            image: '',
            capacity: '2'
        });
    };

    return (
        <div className="mobile-container">
            <div className="page-container">
                <div className="header">
                    <button className="back-btn" onClick={() => navigate('/admin')}>
                        ←
                    </button>
                    <h1>Manage Rooms</h1>
                    <div style={{ width: '36px' }}></div>
                </div>

                <div style={{ padding: '20px' }}>
                    {!showForm ? (
                        <>
                            <button
                                className="btn btn-primary btn-block"
                                onClick={() => setShowForm(true)}
                                style={{ marginBottom: '20px' }}
                            >
                                + Add New Room
                            </button>

                            {rooms.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-state-icon">🛏️</div>
                                    <p>No rooms added yet</p>
                                </div>
                            ) : (
                                rooms.map(room => (
                                    <div key={room.id} className="card">
                                        <img src={room.image} alt={room.type} className="room-image" />

                                        <div style={{ marginTop: '12px' }}>
                                            <div style={{
                                                fontSize: '12px',
                                                color: 'var(--text-secondary)',
                                                marginBottom: '4px'
                                            }}>
                                                {getHotelName(room.hotelId)}
                                            </div>

                                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                                                {room.type}
                                            </h3>

                                            <p style={{
                                                color: 'var(--text-secondary)',
                                                fontSize: '14px',
                                                marginBottom: '8px'
                                            }}>
                                                {room.description}
                                            </p>

                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '12px'
                                            }}>
                                                <div className="price">
                                                    ${room.price}
                                                    <span className="price-small"> /night</span>
                                                </div>
                                                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                                    👥 Up to {room.capacity}
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleEdit(room)}
                                                    style={{ flex: 1 }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete(room.id)}
                                                    style={{ flex: 1 }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </>
                    ) : (
                        <div className="card" style={{ background: 'var(--bg-light)' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
                                {editingRoom ? 'Edit Room' : 'Add New Room'}
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Select Hotel</label>
                                    <select
                                        className="form-input"
                                        value={formData.hotelId}
                                        onChange={(e) => setFormData({ ...formData, hotelId: e.target.value })}
                                        required
                                    >
                                        <option value="">Choose a hotel...</option>
                                        {hotels.map(hotel => (
                                            <option key={hotel.id} value={hotel.id}>
                                                {hotel.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Room Type</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        placeholder="e.g., Deluxe Room, Suite"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-textarea"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Image URL</label>
                                    <input
                                        type="url"
                                        className="form-input"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Price per Night ($)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Capacity (Guests)</label>
                                    <select
                                        className="form-input"
                                        value={formData.capacity}
                                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                        required
                                    >
                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>

                                <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                                    <button type="submit" className="btn btn-success" style={{ flex: 1 }}>
                                        {editingRoom ? 'Update' : 'Add'} Room
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleCancel}
                                        style={{ flex: 1 }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
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

export default ManageRooms;
