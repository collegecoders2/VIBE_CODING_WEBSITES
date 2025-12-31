import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    const tax = cartTotal * 0.1; // 10% tax
    const deliveryFee = cartTotal > 0 ? 5.00 : 0;
    const grandTotal = cartTotal + tax + deliveryFee;

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingCart size={48} className="text-gray-300" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="btn-primary">Browse Restaurants</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <h1 className="text-4xl font-black mb-12">Your Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence>
                        {cart.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex gap-6 items-center"
                            >
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl" />
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <h3 className="font-bold text-lg">{item.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <p className="text-primary-600 font-bold mb-4">${item.price}</p>
                                    <div className="flex items-center gap-4 bg-gray-50 w-fit p-1 rounded-xl">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-1 hover:bg-white rounded-lg transition-colors shadow-sm"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-1 hover:bg-white rounded-lg transition-colors shadow-sm"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-gray-200/50 sticky top-32">
                        <h2 className="text-2xl font-bold mb-8">Summary</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span className="font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Tax (10%)</span>
                                <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Delivery Fee</span>
                                <span className="font-bold text-slate-900">${deliveryFee.toFixed(2)}</span>
                            </div>
                            <div className="h-px bg-gray-100 my-4" />
                            <div className="flex justify-between text-xl font-black">
                                <span>Total</span>
                                <span className="text-primary-600">${grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/payment')}
                            className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-lg"
                        >
                            Checkout <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
