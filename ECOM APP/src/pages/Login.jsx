import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInUser } from '../services/firebaseService';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signInUser(formData.email, formData.password);

        if (result.success) {
            // Check user role and navigate accordingly
            if (result.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } else {
            setError(result.error || 'Invalid email or password');
        }

        setLoading(false);
    };

    return (
        <div className="mobile-container">
            <div className="page-container" style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <div style={{ width: '100%', maxWidth: '350px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{
                            fontSize: '48px',
                            marginBottom: '16px',
                            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                        }}>🏨</div>
                        <h1 style={{
                            color: 'white',
                            fontSize: '28px',
                            marginBottom: '8px',
                            fontWeight: '700'
                        }}>Hotel Booking</h1>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                            Find your perfect stay
                        </p>
                    </div>

                    <div className="card" style={{ padding: '24px' }}>
                        <h2 style={{ marginBottom: '24px', fontSize: '22px', textAlign: 'center' }}>
                            Welcome Back
                        </h2>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                style={{ marginTop: '24px' }}
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <div style={{
                            textAlign: 'center',
                            marginTop: '20px',
                            paddingTop: '20px',
                            borderTop: '1px solid var(--border-color)'
                        }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                Don't have an account?{' '}
                                <Link to="/signup" style={{
                                    color: 'var(--primary-color)',
                                    textDecoration: 'none',
                                    fontWeight: '600'
                                }}>
                                    Sign Up
                                </Link>
                            </p>
                        </div>

                        <div style={{
                            marginTop: '20px',
                            padding: '12px',
                            background: 'var(--bg-light)',
                            borderRadius: '8px',
                            fontSize: '12px',
                            color: 'var(--text-secondary)'
                        }}>
                            <strong>Note:</strong> Create an account or use existing credentials to login.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
