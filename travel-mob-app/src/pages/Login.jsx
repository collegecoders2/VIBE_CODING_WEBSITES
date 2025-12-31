import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                if (!name) throw new Error("Name is required");
                await signup(name, email, password);
            }
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="full-screen-center animate-fade-in" style={{ backgroundColor: 'white' }}>
            <div className="text-center mb-8">
                <div style={{ background: 'var(--primary)', padding: '16px', borderRadius: '50%', display: 'inline-flex', marginBottom: '16px' }}>
                    <Plane size={48} color="white" />
                </div>
                <h1>{isLogin ? 'Welcome Back' : 'Get Started'}</h1>
                <p>Plan your next adventure with us.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ width: '100%' }}>
                {!isLogin && (
                    <input
                        type="text"
                        className="input"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
                <input
                    type="email"
                    className="input"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p style={{ color: 'var(--secondary)', textAlign: 'center' }}>{error}</p>}

                <button type="submit" className="btn btn-primary mt-4">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>

                <button
                    type="button"
                    className="btn"
                    style={{ background: 'transparent', color: 'var(--text-muted)' }}
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
