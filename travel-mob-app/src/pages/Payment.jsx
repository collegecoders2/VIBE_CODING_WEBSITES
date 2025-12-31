import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { CreditCard, CheckCircle } from 'lucide-react';

const Payment = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [error, setError] = useState('');

    if (!state) return <div>Invalid Booking</div>;

    const { tripId, persons, total } = state;

    const handlePay = async (e) => {
        e.preventDefault();
        if (parseFloat(amount) !== total) {
            setError(`Please enter the exact amount: $${total}`);
            return;
        }
        if (cardNumber.length < 16) {
            setError("Invalid card number (dummy)");
            return;
        }

        // Process Booking
        const booking = {
            tripId,
            userId: user.uid, // Use uid for firebase
            persons,
            total,
            status: 'confirmed'
        };
        await StorageService.addBooking(booking);
        navigate('/success');
    };

    return (
        <div className="container animate-fade-in">
            <h2 className="mb-6">Payment</h2>

            <div className="card p-4 mb-6" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)', color: 'white' }}>
                <p className="mb-2 opacity-80">Total to Pay</p>
                <h1 style={{ color: 'white' }}>${total}</h1>
            </div>

            <form onSubmit={handlePay} className="flex flex-col gap-4">
                <div>
                    <label className="text-sm font-bold mb-2 block">Card Number (Dummy)</label>
                    <div className="relative">
                        <input
                            type="text"
                            className="input"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value)}
                            maxLength={19}
                        />
                        <CreditCard style={{ position: 'absolute', right: 14, top: 14, color: 'var(--text-muted)' }} />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-bold mb-2 block">Enter Amount to Confirm</label>
                    <input
                        type="number"
                        className="input"
                        placeholder={`Enter ${total}`}
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>

                {error && <p className="text-secondary text-center">{error}</p>}

                <button type="submit" className="btn btn-primary mt-4">
                    Pay ${total}
                </button>
            </form>
        </div>
    );
};

export default Payment;
