import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { Calendar } from 'lucide-react';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const loadBookings = async () => {
            if (user) {
                const data = await StorageService.getUserBookings(user.uid);
                setBookings(data);
            }
        };
        loadBookings();
    }, [user]);

    if (bookings.length === 0) {
        return (
            <div className="container flex-col items-center justify-center text-center" style={{ paddingTop: '100px' }}>
                <h2>No Bookings Yet</h2>
                <p className="mb-4">You haven't booked any trips yet.</p>
            </div>
        );
    }

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '80px' }}>
            <h2 className="mb-6 mt-4">My Trips</h2>

            <div className="flex flex-col gap-4">
                {bookings.map(booking => (
                    <div key={booking.id} className="card flex gap-4 p-3">
                        <div style={{ width: 80, height: 80, borderRadius: 8, background: booking.trip.image, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                        <div style={{ flex: 1 }}>
                            <h4 style={{ marginBottom: 4 }}>{booking.trip.title}</h4>
                            <span className="text-primary font-bold text-sm">${booking.total}</span>
                            <div className="flex items-center gap-2 text-sm text-muted mt-2">
                                <Calendar size={14} />
                                <span>{new Date(booking.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div>
                            <span style={{
                                background: '#dcfce7', color: '#166534',
                                padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'
                            }}>
                                {booking.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
