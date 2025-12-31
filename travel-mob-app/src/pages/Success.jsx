import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Success = () => {
    const navigate = useNavigate();

    return (
        <div className="full-screen-center animate-fade-in text-center">
            <div style={{ color: '#10b981', marginBottom: '24px' }}>
                <CheckCircle size={80} />
            </div>
            <h1 className="mb-4">Booking Confirmed!</h1>
            <p className="mb-8">Your trip has been successfully booked. Pack your bags!</p>

            <div className="flex flex-col gap-4 w-full">
                <button className="btn btn-primary" onClick={() => navigate('/my-bookings')}>
                    View My Bookings
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/home')}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Success;
