import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, Filter, UtensilsCrossed } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { motion } from 'framer-motion';

const Restaurants = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('All');

    const cuisines = ['All', ...new Set(restaurants.map(res => res.cuisine.split(',')[0].trim()))];

    const filteredRestaurants = restaurants.filter(res => {
        const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCuisine = selectedCuisine === 'All' || res.cuisine.includes(selectedCuisine);
        return matchesSearch && matchesCuisine;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-black mb-4">All Restaurants</h1>
                <p className="text-gray-500 text-lg">Discover the best food & drinks in your city.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 mb-12">
                {/* Search & Filter Bar */}
                <div className="flex-1 relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                    <input
                        type="text"
                        placeholder="Search for restaurants, cuisines or dishes..."
                        className="w-full pl-14 pr-6 py-5 rounded-[24px] border border-gray-200 bg-white shadow-sm focus:ring-4 focus:ring-primary-100 focus:border-primary-400 transition-all text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide shrink-0">
                    {cuisines.map(cuisine => (
                        <button
                            key={cuisine}
                            onClick={() => setSelectedCuisine(cuisine)}
                            className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${selectedCuisine === cuisine
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 scale-105'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-400'
                                }`}
                        >
                            {cuisine}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRestaurants.map((res, index) => (
                    <motion.div
                        key={res.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="card group"
                    >
                        <Link to={`/restaurant/${res.id}`}>
                            <div className="relative h-60 overflow-hidden">
                                <img src={res.image} alt={res.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                {res.offer && (
                                    <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-lg">
                                        <Filter size={12} /> {res.offer}
                                    </div>
                                )}
                                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-1 text-xs font-black shadow-sm">
                                    <Clock size={14} className="text-gray-500" /> {res.deliveryTime}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold group-hover:text-primary-600 transition-colors">{res.name}</h3>
                                    <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                                        {res.rating} <Star size={12} fill="currentColor" />
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                                    <UtensilsCrossed size={14} /> {res.cuisine}
                                </p>
                                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Price: {res.priceRange}</span>
                                    <button className="text-primary-600 font-black text-sm group-hover:translate-x-1 transition-transform">Order Now →</button>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {filteredRestaurants.length === 0 && (
                <div className="text-center py-24 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                    <UtensilsCrossed size={64} className="mx-auto text-gray-200 mb-6" />
                    <h2 className="text-2xl font-bold mb-2">No restaurants found</h2>
                    <p className="text-gray-400">Try adjusting your filters or search terms</p>
                </div>
            )}
        </div>
    );
};

export default Restaurants;
