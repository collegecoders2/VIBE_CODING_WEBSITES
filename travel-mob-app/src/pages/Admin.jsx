import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { Plus, Trash, Users, List, DollarSign } from 'lucide-react';

const Admin = () => {
    const [trips, setTrips] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('trips');
    const [isAdding, setIsAdding] = useState(false);

    // New Trip State
    const [newTrip, setNewTrip] = useState({ title: '', location: '', price: '', image: '', description: '', dates: '' });

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = async () => {
        setTrips(await StorageService.getTrips());
        setBookings(await StorageService.getAllBookings());
        setUsers(await StorageService.getAllUsers());
    };

    const handleDeleteTrip = async (id) => {
        if (window.confirm("Are you sure?")) {
            await StorageService.deleteTrip(id);
            refreshData();
        }
    };

    const handleAddTrip = async (e) => {
        e.preventDefault();
        let finalImage = newTrip.image;
        if ((finalImage.startsWith('http') || finalImage.startsWith('data:')) && !finalImage.startsWith('url')) {
            finalImage = `url('${finalImage}')`;
        }
        await StorageService.addTrip({ ...newTrip, image: finalImage });
        setIsAdding(false);
        refreshData();
        setNewTrip({ title: '', location: '', price: '', image: '', description: '', dates: '' });
    };

    const totalRevenue = bookings.reduce((acc, b) => acc + b.total, 0);

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '80px' }}>
            <h2 className="mt-4 mb-6">Admin Dashboard</h2>

            <div className="flex gap-2 mb-6 over-x-auto">
                <div className="card p-3 flex-1 flex flex-col items-center">
                    <span className="text-muted text-sm">Bookings</span>
                    <span className="font-bold text-xl">{bookings.length}</span>
                </div>
                <div className="card p-3 flex-1 flex flex-col items-center">
                    <span className="text-muted text-sm">Revenue</span>
                    <span className="font-bold text-xl">${totalRevenue}</span>
                </div>
            </div>

            <div className="flex gap-4 mb-6 border-b border-border pb-2 overflow-x-auto">
                <button
                    className={`text-sm font-bold ${activeTab === 'trips' ? 'text-primary' : 'text-muted'}`}
                    onClick={() => setActiveTab('trips')}
                >
                    Manage Trips
                </button>
                <button
                    className={`text-sm font-bold ${activeTab === 'bookings' ? 'text-primary' : 'text-muted'}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    All Bookings
                </button>
                <button
                    className={`text-sm font-bold ${activeTab === 'users' ? 'text-primary' : 'text-muted'}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
            </div>

            {activeTab === 'trips' && (
                <div>
                    <div className="flex gap-2 mb-4">
                        <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
                            <Plus size={20} className="mr-2" /> Add New Trip
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                if (window.confirm('This will DELETE all current trips and restore the 5 defaults with new images. Continue?')) {
                                    StorageService.resetDefaultTrips().then(refreshData);
                                }
                            }}
                        >
                            Reset Defaults
                        </button>
                    </div>

                    {isAdding && (
                        <form onSubmit={handleAddTrip} className="card p-4 mb-4 flex flex-col gap-3">
                            <input className="input" placeholder="Title" value={newTrip.title} onChange={e => setNewTrip({ ...newTrip, title: e.target.value })} required />
                            <input className="input" placeholder="Location" value={newTrip.location} onChange={e => setNewTrip({ ...newTrip, location: e.target.value })} required />
                            <input className="input" type="number" placeholder="Price" value={newTrip.price} onChange={e => setNewTrip({ ...newTrip, price: Number(e.target.value) })} required />
                            <input className="input" placeholder="Image CSS (Gradient/URL)" value={newTrip.image} onChange={e => setNewTrip({ ...newTrip, image: e.target.value })} required />
                            <textarea className="input" placeholder="Description" value={newTrip.description} onChange={e => setNewTrip({ ...newTrip, description: e.target.value })} />
                            <input className="input" placeholder="Dates" value={newTrip.dates} onChange={e => setNewTrip({ ...newTrip, dates: e.target.value })} required />
                            <button type="submit" className="btn btn-primary">Save Trip</button>
                        </form>
                    )}

                    <div className="flex flex-col gap-4">
                        {trips.map(trip => (
                            <div key={trip.id} className="card p-3 flex justify-between items-center">
                                <div className="flex gap-3 items-center">
                                    <div style={{ width: 50, height: 50, borderRadius: 8, background: trip.image, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                                    <div>
                                        <h4 className="text-sm">{trip.title}</h4>
                                        <p className="text-xs text-muted">${trip.price}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleDeleteTrip(trip.id)} className="btn btn-danger" style={{ width: 'auto', padding: '8px' }}>
                                    <Trash size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'bookings' && (
                <div className="flex flex-col gap-4">
                    {bookings.map(b => (
                        <div key={b.id} className="card p-3">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-sm">Booking #{b.id.slice(-4)}</span>
                                <span className="text-primary font-bold">${b.total}</span>
                            </div>
                            <p className="text-xs text-muted">User ID: {b.userId}</p>
                            <p className="text-xs">Trip: {b.trip.title}</p>
                            <p className="text-xs">Date: {new Date(b.date).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'users' && (
                <div className="flex flex-col gap-4">
                    {users.map(u => (
                        <div key={u.id} className="card p-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div style={{ width: 40, height: 40, background: 'var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Users size={20} className="text-muted" />
                                </div>
                                <div>
                                    <h4 className="text-sm">{u.name}</h4>
                                    <p className="text-xs text-muted">{u.email}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-xs font-bold uppercase p-1 bg-border rounded">{u.role}</span>
                                <button
                                    onClick={() => {
                                        if (window.confirm('Delete this user?')) {
                                            StorageService.deleteUser(u.id).then(refreshData);
                                        }
                                    }}
                                    className="text-xs text-secondary"
                                    style={{ border: 'none', background: 'none' }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Admin;
