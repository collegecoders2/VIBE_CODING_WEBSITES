import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Star, Clock, Gift } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { motion } from 'framer-motion';

const Offers = () => {
    const restaurantsWithOffers = restaurants.filter(res => res.offer);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-primary-50 p-8 rounded-[40px] border border-primary-100">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary-200">
                    <Tag size={32} />
                </div>
                <div>
                    <h1 className="text-4xl font-black mb-2">Exclusive Offers</h1>
                    <p className="text-gray-600 font-medium text-lg">Taste more for less! grab the best deals from top-rated restaurants.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {restaurantsWithOffers.map((res, index) => (
                    <motion.div
                        key={res.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                    >
                        <div className="absolute -top-3 -left-3 z-30 bg-primary-600 text-white px-4 py-2 rounded-xl font-black text-sm shadow-xl shadow-primary-200 flex items-center gap-2 animate-bounce">
                            <Gift size={16} /> {res.offer}
                        </div>

                        <Link to={`/restaurant/${res.id}`} className="block card">
                            <div className="relative h-48 overflow-hidden">
                                <img src={res.image} alt={res.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-xl font-bold">{res.name}</h3>
                                    <div className="flex items-center gap-3 text-xs font-bold mt-1">
                                        <span className="flex items-center gap-1 text-yellow-400">
                                            <Star size={14} fill="currentColor" /> {res.rating}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} /> {res.deliveryTime}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-500 text-sm mb-4 line-clamp-1">{res.cuisine}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-primary-600 font-bold text-sm">View Deal</span>
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                        <Gift size={16} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {restaurantsWithOffers.length === 0 && (
                <div className="text-center py-24 text-gray-400">
                    No active offers at the moment.
                </div>
            )}
        </div>
    );
};

export default Offers;
