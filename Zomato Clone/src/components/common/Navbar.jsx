import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    return (
        <nav className="glass-nav px-4 md:px-8 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white rotate-3 group-hover:rotate-12 transition-transform duration-300">
                    <ShoppingCart size={24} fill="currentColor" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                    FoodKart
                </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
                <Link to="/restaurants" className="hover:text-primary-600 transition-colors">Restaurants</Link>
                <Link to="/offers" className="hover:text-primary-600 transition-colors">Offers</Link>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ShoppingCart size={22} className="text-gray-700" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 border-l pl-4 border-gray-200">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-primary-600">
                                <User size={18} />
                            </div>
                            <span className="text-sm font-semibold max-w-[100px] truncate">{user.name}</span>
                        </div>
                        <button
                            onClick={() => { logout(); navigate('/login'); }}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600 transition-colors">
                            Login
                        </Link>
                        <Link to="/signup" className="btn-primary py-2 text-sm">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
