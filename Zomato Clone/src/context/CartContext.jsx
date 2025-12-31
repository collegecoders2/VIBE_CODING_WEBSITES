import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setCart([]);
            return;
        }

        const docRef = doc(db, "carts", user.uid);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setCart(docSnap.data().items || []);
            } else {
                setCart([]);
            }
        }, (error) => {
            console.error("Cart fetch error:", error);
        });

        return () => unsubscribe();
    }, [user]);

    const syncCart = async (newItems) => {
        if (user) {
            try {
                await setDoc(doc(db, "carts", user.uid), {
                    items: newItems,
                    updatedAt: new Date().toISOString()
                });
            } catch (error) {
                console.error("Cart sync error:", error);
            }
        }
    };

    const addToCart = async (item) => {
        const existingItem = cart.find(i => i.id === item.id);
        let newCart;
        if (existingItem) {
            newCart = cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
        } else {
            newCart = [...cart, { ...item, quantity: 1 }];
        }
        setCart(newCart);
        await syncCart(newCart);
    };

    const removeFromCart = async (itemId) => {
        const newCart = cart.filter(i => i.id !== itemId);
        setCart(newCart);
        await syncCart(newCart);
    };

    const updateQuantity = async (itemId, delta) => {
        const newCart = cart.map(i => {
            if (i.id === itemId) {
                const newQuantity = i.quantity + delta;
                return newQuantity > 0 ? { ...i, quantity: newQuantity } : i;
            }
            return i;
        }).filter(i => i.quantity > 0);

        setCart(newCart);
        await syncCart(newCart);
    };

    const clearCart = async () => {
        setCart([]);
        if (user) {
            await setDoc(doc(db, "carts", user.uid), { items: [] });
        }
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
