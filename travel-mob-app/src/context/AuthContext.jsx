import React, { createContext, useState, useEffect, useContext } from 'react';
import { StorageService } from '../services/storage';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize DB (seed if needed)
        StorageService.init();

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // If it's the specific admin email, we might need to ensure the doc exists if it was created purely in Auth console
                    let userData = await StorageService.getUser(firebaseUser.uid);

                    if (!userData && firebaseUser.email === 'admin@travel.com') {
                        // Fallback: This might happen if init didn't catch it or manual auth creation
                        // But StorageCollection.login handles it.
                        // Here we just handle reloading the page when already logged in.
                        // We can assume user role is admin if matches email for safety in this simple demo
                        userData = { uid: firebaseUser.uid, email: firebaseUser.email, name: 'Admin', role: 'admin' };
                    }

                    if (userData) {
                        setUser(userData);
                    } else {
                        // Basic fallback
                        setUser({ uid: firebaseUser.uid, email: firebaseUser.email, name: 'User', role: 'user' });
                    }
                } catch (e) {
                    console.error("Error fetching user profile", e);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        const user = await StorageService.login(email, password);
        setUser(user);
        return user;
    };

    const signup = async (name, email, password) => {
        const user = await StorageService.signup(name, email, password);
        setUser(user);
        return user;
    };

    const logout = async () => {
        await StorageService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
