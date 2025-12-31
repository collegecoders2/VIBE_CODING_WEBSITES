import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { StorageService } from '../services/storage';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="container animate-fade-in">
            <h2 className="mt-4 mb-6">Profile</h2>
            <div className="card p-4 flex items-center gap-4 mb-6">
                <div style={{ width: 60, height: 60, background: 'var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={30} />
                </div>
                <div>
                    <h3>{user?.name}</h3>
                    <p>{user?.email}</p>
                    <span className="text-xs text-muted uppercase">{user?.role}</span>
                </div>
            </div>

            <button className="btn btn-secondary w-full" onClick={handleLogout}>
                <LogOut size={20} className="mr-2" /> Logout
            </button>

            <div className="mt-4 pt-4 border-t border-border">
                <button
                    className="btn btn-danger w-full"
                    onClick={() => {
                        if (window.confirm('Reset all app data? This cannot be undone.')) {
                            StorageService.clearAll();
                        }
                    }}
                >
                    Reset App Data
                </button>
            </div>
        </div>
    );
};

export default Profile;
