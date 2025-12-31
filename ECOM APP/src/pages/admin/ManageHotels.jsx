import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthChange, getHotels, addHotel, updateHotel, deleteHotel } from '../../services/firebaseService';

function ManageHotels() {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingHotel, setEditingHotel] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '',
        image: '',
        startingPrice: '',
        amenities: ''
    });

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (!user || user.role !== 'admin') {
                navigate('/login');
            } else {
                loadHotels();
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const loadHotels = async () => {
        const data = await getHotels();
        setHotels(data);
    };

    const handleEdit = (hotel) => {
        setEditingHotel(hotel);
        setFormData({
            name: hotel.name,
            location: hotel.location,
            description: hotel.description,
            image: hotel.image,
            startingPrice: hotel.startingPrice,
            amenities: hotel.amenities.join(', ')
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this hotel? All associated rooms will also be deleted.')) {
            await deleteHotel(id);
            loadHotels();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hotelData = {
            name: formData.name,
            location: formData.location,
            description: formData.description,
            image: formData.image,
            startingPrice: parseFloat(formData.startingPrice),
            amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a)
        };

        if (editingHotel) {
            await updateHotel(editingHotel.id, hotelData); // Promise is floating, but okay for sync-like behavior or await it
        } else {
            await addHotel(hotelData);
        }

        setShowForm(false);
        setEditingHotel(null);
        setFormData({
            name: '',
            location: '',
            description: '',
            image: '',
            startingPrice: '',
            amenities: ''
        });
        loadHotels();
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingHotel(null);
        setFormData({
            name: '',
            location: '',
            description: '',
            image: '',
            startingPrice: '',
            amenities: ''
        });
    };

    return (
        <div className="mobile-container">
            <div className="page-container">
                <div className="header">
                    <button className="back-btn" onClick={() => navigate('/admin')}>
                        ←
                    </button>
                    <h1>Manage Hotels</h1>
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
                                + Add New Hotel
                            </button>

                            {hotels.map(hotel => (
                                <div key={hotel.id} className="card">
                                    <img src={hotel.image} alt={hotel.name} className="hotel-image" />

                                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                                        {hotel.name}
                                    </h3>

                                    <div style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '14px',
                                        marginBottom: '12px'
                                    }}>
                                        📍 {hotel.location}
                                    </div>

                                    <div className="price" style={{ marginBottom: '12px' }}>
                                        ${hotel.startingPrice}
                                        <span className="price-small"> /night</span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleEdit(hotel)}
                                            style={{ flex: 1 }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(hotel.id)}
                                            style={{ flex: 1 }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="card" style={{ background: 'var(--bg-light)' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
                                {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Hotel Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                                    <label className="form-label">Starting Price ($)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={formData.startingPrice}
                                        onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Amenities (comma separated)</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.amenities}
                                        onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                                        placeholder="WiFi, Pool, Gym, Restaurant"
                                        required
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                                    <button type="submit" className="btn btn-success" style={{ flex: 1 }}>
                                        {editingHotel ? 'Update' : 'Add'} Hotel
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

export default ManageHotels;
