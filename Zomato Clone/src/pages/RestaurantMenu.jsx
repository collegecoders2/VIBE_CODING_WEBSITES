import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, ChevronLeft, Plus, Minus, ShoppingBag, Gift } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const RestaurantMenu = () => {
    const { id } = useParams();
    const { addToCart, updateQuantity, cart } = useCart();
    const restaurant = restaurants.find(r => r.id === parseInt(id));

    if (!restaurant) return <div className="text-center py-20 font-bold text-2xl">Restaurant not found</div>;

    const getItemQuantity = (itemId) => {
        const item = cart.find(i => i.id === itemId);
        return item ? item.quantity : 0;
    };

    const handleAddToCart = (item) => {
        addToCart(item);
        toast.success(`${item.name} added to cart!`, {
            style: {
                borderRadius: '12px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
            <Link to="/restaurants" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-8 group">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Restaurants
            </Link>

            {/* Restaurant Info Header */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center mb-12">
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full md:w-64 h-48 md:h-64 object-cover rounded-2xl"
                />
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl font-black mb-2">{restaurant.name}</h1>
                    <p className="text-gray-500 text-lg mb-6">{restaurant.cuisine}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-xl font-bold">
                            <Star size={18} fill="currentColor" />
                            {restaurant.rating} Rating
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-bold">
                            <Clock size={18} />
                            {restaurant.deliveryTime}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl font-bold">
                            {restaurant.priceRange} Price Range
                        </div>
                        {restaurant.offer && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-xl font-bold animate-pulse border border-primary-100">
                                <Gift size={18} />
                                {restaurant.offer}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <h2 className="text-2xl font-bold mb-8">Popular Menu Items</h2>
            <div className="space-y-6">
                {restaurant.menu.map((item, index) => {
                    const quantity = getItemQuantity(item.id);
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow"
                        >
                            <img src={item.image} alt={item.name} className="w-full sm:w-32 h-32 object-cover rounded-2xl" />
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold">{item.name}</h3>
                                    <span className="text-xl font-black text-primary-600">${item.price}</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2 md:line-clamp-none">{item.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg uppercase tracking-wider">
                                        {item.category}
                                    </span>

                                    {quantity > 0 ? (
                                        <div className="flex items-center gap-4 bg-gray-100 p-1 rounded-xl">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="p-2 hover:bg-white rounded-lg transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="font-bold w-4 text-center">{quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-2 hover:bg-white rounded-lg transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="btn-primary flex items-center gap-2"
                                        >
                                            <ShoppingBag size={18} /> Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default RestaurantMenu;
