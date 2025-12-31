import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storage';
import { ArrowLeft, Users } from 'lucide-react';

const Booking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [persons, setPersons] = useState(1);
    const [date, setDate] = useState('');

    useEffect(() => {
        const loadTrip = async () => {
            const data = await StorageService.getTrip(id);
            setTrip(data);
        };
        loadTrip();
    }, [id]);

    if (!trip) return <div>Loading...</div>;

    const total = trip.price * persons;

    const handleProceed = () => {
        navigate('/payment', { state: { tripId: id, persons, total, date } });
    };

    return (
        <div className="container animate-fade-in">
            <header className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none' }}>
                    <ArrowLeft size={24} />
                </button>
                <h2>Book Trip</h2>
            </header>

            <div className="card p-4 flex gap-4 items-center">
                <div style={{ width: 80, height: 80, borderRadius: 8, background: trip.image, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                <div>
                    <h4>{trip.title}</h4>
                    <p className="text-primary">${trip.price} / person</p>
                </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
                <div>
                    <label className="text-sm font-bold mb-2 block">Number of Persons</label>
                    <div className="flex items-center gap-4">
                        <button
                            className="btn"
                            style={{ width: 40, padding: 0 }}
                            onClick={() => setPersons(Math.max(1, persons - 1))}
                        >-</button>
                        <span className="font-bold text-lg">{persons}</span>
                        <button
                            className="btn"
                            style={{ width: 40, padding: 0 }}
                            onClick={() => setPersons(persons + 1)}
                        >+</button>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-muted">Total Amount</span>
                    <span className="font-bold text-xl">${total}</span>
                </div>
                <button className="btn btn-primary" onClick={handleProceed}>
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default Booking;
