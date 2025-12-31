import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storage';
import { MapPin, Calendar, Clock, ArrowLeft } from 'lucide-react';

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        const loadTrip = async () => {
            const data = await StorageService.getTrip(id);
            setTrip(data);
        };
        loadTrip();
    }, [id]);

    if (!trip) return <div className="full-screen-center">Loading...</div>;

    return (
        <div className="container animate-fade-in" style={{ padding: 0 }}>
            <div style={{ position: 'relative', height: '300px' }}>
                <div style={{ width: '100%', height: '100%', background: trip.image, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        position: 'absolute', top: 16, left: 16,
                        background: 'white', border: 'none', borderRadius: '50%',
                        width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                >
                    <ArrowLeft size={20} />
                </button>
            </div>

            <div style={{
                padding: '24px',
                background: 'var(--background)',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                marginTop: '-24px',
                position: 'relative',
                minHeight: 'calc(100vh - 276px)'
            }}>
                <div className="flex justify-between items-start mb-4">
                    <h1 style={{ fontSize: '26px' }}>{trip.title}</h1>
                    <span className="text-primary font-bold" style={{ fontSize: '22px' }}>${trip.price}</span>
                </div>

                <div className="flex gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted" style={{ color: 'var(--text-muted)' }}>
                        <MapPin size={18} />
                        <span>{trip.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted" style={{ color: 'var(--text-muted)' }}>
                        <Calendar size={18} />
                        <span>{trip.dates}</span>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="mb-2">About the trip</h3>
                    <p style={{ lineHeight: 1.6 }}>{trip.description}</p>
                </div>

                <div style={{ position: 'sticky', bottom: 16 }}>
                    <button className="btn btn-primary" onClick={() => navigate(`/booking/${trip.id}`)}>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Detail;
