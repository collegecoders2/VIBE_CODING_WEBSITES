import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const location = useLocation();
    const { state } = location;

    // Use state values if available, otherwise fallback to context
    const [orderSummary] = useState({
        items: state?.items || [...cart],
        total: state?.subtotal !== undefined ? state.subtotal : cartTotal
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Clear cart after capturing summary
        if (cart.length > 0) {
            clearCart();
        }
    }, []);

    const tax = orderSummary.total * 0.1;
    const grandTotal = orderSummary.total + tax + 5.00;

    return (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100"
            >
                <CheckCircle size={48} />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-black mb-4"
            >
                Order Placed Successfully!
            </motion.h1>
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 text-lg mb-12"
            >
                Your delicious food is being prepared and will be delivered shortly.
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-gray-100 text-left mb-12"
            >
                <div className="flex items-center gap-2 mb-6 text-gray-400 border-b border-gray-100 pb-4">
                    <Package size={20} />
                    <span className="font-bold uppercase tracking-widest text-xs">Order Summary</span>
                </div>

                <div className="space-y-4 mb-8">
                    {orderSummary.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="bg-gray-100 text-gray-600 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-lg">
                                    {item.quantity}
                                </span>
                                <span className="font-medium">{item.name}</span>
                            </div>
                            <span className="font-bold text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="space-y-2 border-t border-gray-100 pt-6">
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Subtotal</span>
                        <span>${orderSummary.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Tax & Fees</span>
                        <span>${(tax + 5.00).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-black mt-4">
                        <span>Grand Total</span>
                        <span className="text-primary-600">${grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/" className="btn-primary py-4 px-10 flex items-center justify-center gap-2">
                    <Home size={20} /> Back to Home
                </Link>
                <button className="btn-outline py-4 px-10 flex items-center justify-center gap-2">
                    <ShoppingBag size={20} /> Tracking Order
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
