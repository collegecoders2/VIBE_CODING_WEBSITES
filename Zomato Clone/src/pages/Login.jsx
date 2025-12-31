import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full animate-slide-up">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black mb-2">Login</h1>
                    <p className="text-gray-500">Welcome back to FoodKart!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="email"
                            required
                            placeholder="Email Address"
                            className="input-field pl-12"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            className="input-field pl-12"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="w-full btn-primary py-4 text-lg">
                        Login
                    </button>
                </form>

                <p className="text-center mt-8 text-gray-500 font-medium">
                    Don't have an account? <Link to="/signup" className="text-primary-600 hover:underline">Sign up</Link>
                </p>

                <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
                    <div className="text-xs text-blue-600 space-y-1">
                        <p>1. Signup first to create an account</p>
                        <p>2. Or use any credentials if you've already signed up</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
