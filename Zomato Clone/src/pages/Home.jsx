import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, Heart } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { motion } from 'framer-motion';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "restaurants"));
                const resData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRestaurants(resData);
            } catch (error) {
                console.error("Error fetching restaurants: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    const filteredRestaurants = restaurants.filter(res =>
        res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
            {/* Hero Section */}
            <section className="relative rounded-[40px] overflow-hidden bg-primary-600 mb-12 animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1500&auto=format&fit=crop"
                    alt="Delicious food"
                    className="w-full h-[300px] md:h-[450px] object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 text-white max-w-2xl">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                    >
                        Order Food From Your <span className="text-secondary-400">Favorite</span> Restaurants
                    </motion.h1>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative max-w-lg"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search for restaurants or cuisines..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/20 shadow-2xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Offers Quick Link Section */}
            <section className="mb-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">Top Offers for You</h2>
                    <Link to="/offers" className="text-primary-600 font-bold hover:underline">View All</Link>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                    {restaurants.filter(r => r.offer).map((res) => (
                        <motion.div
                            key={`offer-${res.id}`}
                            whileHover={{ scale: 1.02 }}
                            className="min-w-[280px] md:min-w-[350px] bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-primary-100"
                        >
                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold mb-4 uppercase tracking-widest">Limited Deal</span>
                                <h3 className="text-2xl font-black mb-2">{res.offer}</h3>
                                <p className="text-white/80 text-sm mb-6">At {res.name}</p>
                                <Link to={`/restaurant/${res.id}`} className="bg-white text-primary-700 px-6 py-2 rounded-xl font-bold text-sm inline-block shadow-lg">Grab Now</Link>
                            </div>
                            <div className="absolute -right-10 -bottom-10 opacity-20 rotate-12">
                                <Star size={180} fill="white" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Popular Dishes Section */}
            <section className="mb-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">Popular Dishes</h2>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                    {restaurants.flatMap(res => res.menu.map(item => ({ ...item, restaurantId: res.id, restaurantName: res.name })))
                        .slice(0, 10) // Show top 10 for performance/UI
                        .map((item) => (
                            <motion.div
                                key={`item-${item.id}`}
                                whileHover={{ y: -5 }}
                                className="min-w-[200px] bg-white rounded-3xl p-4 shadow-sm border border-gray-100 group"
                            >
                                <div className="relative h-40 rounded-2xl overflow-hidden mb-4">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black shadow-sm">
                                        ${item.price}
                                    </div>
                                </div>
                                <h3 className="font-bold text-sm mb-1 line-clamp-1">{item.name}</h3>
                                <p className="text-gray-400 text-[10px] mb-3">{item.restaurantName}</p>
                                <Link to={`/restaurant/${item.restaurantId}`} className="w-full py-2 bg-gray-50 text-primary-600 text-center rounded-xl text-[10px] font-bold block hover:bg-primary-600 hover:text-white transition-colors">
                                    Order Now
                                </Link>
                            </motion.div>
                        ))}
                </div>
            </section>

            {/* Restaurants List */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">Popular Restaurants</h2>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-primary-500 transition-colors">Filters</button>
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-primary-500 transition-colors">Rating 4.0+</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRestaurants.slice(0, 10).map((res, index) => (
                        <motion.div
                            key={res.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card group cursor-pointer"
                        >
                            <Link to={`/restaurant/${res.id}`}>
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={res.image}
                                        alt={res.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 z-20">
                                        <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all duration-300">
                                            <Heart size={20} />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold rounded-lg flex items-center gap-1">
                                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                            {res.rating}
                                        </span>
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold rounded-lg flex items-center gap-1">
                                            <Clock size={14} className="text-gray-600" />
                                            {res.deliveryTime}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold group-hover:text-primary-600 transition-colors">{res.name}</h3>
                                        <span className="text-gray-500 font-medium">{res.priceRange}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4">{res.cuisine}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Free Delivery
                                        </span>
                                        <button className="text-primary-600 font-bold text-sm hover:underline">View Menu</button>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredRestaurants.length === 0 && (
                    <div className="text-center py-20">
                        <Search size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold mb-2">No restaurants found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
