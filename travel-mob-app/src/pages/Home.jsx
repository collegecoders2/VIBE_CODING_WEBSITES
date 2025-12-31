import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storage';
import { Search, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const [trips, setTrips] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const loadTrips = async () => {
            const data = await StorageService.getTrips();
            setTrips(data);
        };
        loadTrips();
    }, []);

    const filteredTrips = trips.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '80px' }}>
            <header className="mb-4 mt-4 flex justify-between items-center">
                <div>
                    <p className="text-sm">Hello, {user?.name}</p>
                    <h2>Discover Places</h2>
                </div>
                <div style={{ width: 40, height: 40, background: 'var(--border)', borderRadius: '50%', overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2e8f0', fontWeight: 'bold', fontSize: '14px', color: 'var(--primary)' }}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                </div>
            </header>

            <div className="relative mb-6">
                <input
                    type="text"
                    className="input"
                    placeholder="Search destination..."
                    style={{ paddingLeft: '44px' }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Search size={20} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
            </div>

            <div className="flex flex-col gap-4">
                {filteredTrips.map(trip => (
                    <div key={trip.id} className="card" onClick={() => navigate(`/trip/${trip.id}`)}>
                        <div style={{ height: '180px', overflow: 'hidden', background: trip.image, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 style={{ fontSize: '18px' }}>{trip.title}</h3>
                                <span className="text-primary font-bold">${trip.price}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted">
                                <MapPin size={16} />
                                <span>{trip.location}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
