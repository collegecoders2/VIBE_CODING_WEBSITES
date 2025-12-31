import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUpUser } from '../services/firebaseService';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        const result = await signUpUser(
            formData.email,
            formData.password,
            formData.name,
            formData.phone
        );

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error || 'Failed to create account');
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
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
                        }}>Create Account</h1>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                            Join us and start booking
                        </p>
                    </div>

                    <div className="card" style={{ padding: '24px' }}>
                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                    disabled={loading}
                                />
                            </div>

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
                                <label className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
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
                                    placeholder="Create a password"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-input"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
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
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </form>

                        <div style={{
                            textAlign: 'center',
                            marginTop: '20px',
                            paddingTop: '20px',
                            borderTop: '1px solid var(--border-color)'
                        }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                Already have an account?{' '}
                                <Link to="/login" style={{
                                    color: 'var(--primary-color)',
                                    textDecoration: 'none',
                                    fontWeight: '600'
                                }}>
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
