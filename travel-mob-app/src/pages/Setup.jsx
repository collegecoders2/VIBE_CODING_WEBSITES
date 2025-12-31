import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storage';
import { useNavigate } from 'react-router-dom';

const Setup = () => {
    const [status, setStatus] = useState('Initializing update...');
    const navigate = useNavigate();

    useEffect(() => {
        const runUpdate = async () => {
            try {
                setStatus('Deleting old data...');
                await StorageService.resetDefaultTrips();
                setStatus('Seeding new high-quality images...');

                // Allow some time for Firestore to propagate if needed, though await is usually enough
                setTimeout(() => {
                    setStatus('Success! Redirecting to Home...');
                    setTimeout(() => navigate('/home'), 1000);
                }, 1000);
            } catch (error) {
                console.error(error);
                setStatus('Error: ' + error.message);
            }
        };

        runUpdate();
    }, [navigate]);

    return (
        <div className="full-screen-center flex-col gap-4">
            <div className="spinner" style={{ width: 40, height: 40, border: '4px solid #e2e8f0', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <h2>Running Database Migration</h2>
            <p className="text-muted">{status}</p>
        </div>
    );
};

export default Setup;
