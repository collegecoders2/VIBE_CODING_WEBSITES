import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, DollarSign, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import toast from 'react-hot-toast';

const Payment = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [amount, setAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const tax = cartTotal * 0.1;
    const deliveryFee = 5.00;
    const grandTotal = cartTotal + tax + deliveryFee;

    const handlePayment = async (e) => {
        e.preventDefault();
        const enteredAmount = parseFloat(amount);

        if (enteredAmount === parseFloat(grandTotal.toFixed(2))) {
            setIsProcessing(true);
            try {
                // Save order to Firestore
                await addDoc(collection(db, "orders"), {
                    userId: user.uid,
                    userName: user.displayName,
                    userEmail: user.email,
                    items: cart,
                    subtotal: cartTotal,
                    tax: tax,
                    deliveryFee: deliveryFee,
                    total: grandTotal,
                    status: 'Confirmed',
                    createdAt: new Date().toISOString()
                });

                setTimeout(() => {
                    setIsProcessing(false);
                    // Pass order details to success page instead of clearing immediately
                    navigate('/order-success', {
                        state: {
                            items: cart,
                            subtotal: cartTotal,
                            tax: tax,
                            deliveryFee: deliveryFee,
                            grandTotal: grandTotal
                        }
                    });
                }, 1500);
            } catch (error) {
                console.error("Order process error:", error);
                toast.error("Failed to store order in database. Check Firebase rules.");
                setIsProcessing(false);
            }
        } else {
            toast.error(`Please enter the exact total amount: $${grandTotal.toFixed(2)}`, {
                duration: 4000,
                position: 'top-center',
            });
        }
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-12 animate-fade-in">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-gray-200 border border-gray-100">
                <h1 className="text-3xl font-black mb-8 text-center">Checkout</h1>

                <div className="bg-gray-50 rounded-3xl p-6 mb-10 border border-dashed border-gray-300">
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span className="text-gray-500">Order Total</span>
                        <span className="text-primary-600 text-2xl font-black">${grandTotal.toFixed(2)}</span>
                    </div>
                </div>

                <form onSubmit={handlePayment} className="space-y-8">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Confirm Amount</label>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="number"
                                step="0.01"
                                required
                                placeholder="Enter exact total amount"
                                className="input-field pl-12 h-16 text-xl font-bold"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <p className="mt-4 text-sm text-gray-400 text-center italic">
                            * This is a dummy payment. Please enter the total amount above to proceed.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100">
                            <ShieldCheck className="text-green-600" size={24} />
                            <span className="text-sm font-bold text-green-800">Secure Payment Simulation</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3"
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <CreditCard size={24} /> Pay Now
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
