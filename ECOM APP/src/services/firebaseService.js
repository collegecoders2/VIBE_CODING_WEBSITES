import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    addDoc,
    serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Generate unique ID
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// ==================== AUTH FUNCTIONS ====================

// Sign up new user
export const signUpUser = async (email, password, name, phone) => {
    try {
        // Create auth user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            email: email,
            name: name,
            phone: phone,
            role: email === 'admin@test.com' ? 'admin' : 'user',
            createdAt: serverTimestamp()
        });

        return { success: true, user };
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, error: error.message };
    }
};

// Sign in user
export const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (userDoc.exists()) {
            return { success: true, user: userDoc.data() };
        } else {
            return { success: false, error: 'User data not found' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
    }
};

// Sign out user
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: error.message };
    }
};

// Get current user
export const getCurrentUser = () => {
    return auth.currentUser;
};

// Listen to auth state changes
export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                callback(userDoc.data());
            } else {
                callback(null);
            }
        } else {
            callback(null);
        }
    });
};

// ==================== USER FUNCTIONS ====================

// Get all users
export const getUsers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        return users;
    } catch (error) {
        console.error('Error getting users:', error);
        return [];
    }
};

// Get user by ID
export const getUserById = async (userId) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            return userDoc.data();
        }
        return null;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

// ==================== HOTEL FUNCTIONS ====================

// Get all hotels
export const getHotels = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'hotels'));
        const hotels = [];
        querySnapshot.forEach((doc) => {
            hotels.push({ id: doc.id, ...doc.data() });
        });
        return hotels;
    } catch (error) {
        console.error('Error getting hotels:', error);
        return [];
    }
};

// Get hotel by ID
export const getHotelById = async (hotelId) => {
    try {
        const hotelDoc = await getDoc(doc(db, 'hotels', hotelId));
        if (hotelDoc.exists()) {
            return { id: hotelDoc.id, ...hotelDoc.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting hotel:', error);
        return null;
    }
};

// Add hotel
export const addHotel = async (hotelData) => {
    try {
        const docRef = await addDoc(collection(db, 'hotels'), {
            ...hotelData,
            createdAt: serverTimestamp()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding hotel:', error);
        return { success: false, error: error.message };
    }
};

// Update hotel
export const updateHotel = async (hotelId, hotelData) => {
    try {
        await updateDoc(doc(db, 'hotels', hotelId), {
            ...hotelData,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating hotel:', error);
        return { success: false, error: error.message };
    }
};

// Delete hotel
export const deleteHotel = async (hotelId) => {
    try {
        // Delete hotel
        await deleteDoc(doc(db, 'hotels', hotelId));

        // Delete associated rooms
        const roomsQuery = query(collection(db, 'rooms'), where('hotelId', '==', hotelId));
        const roomsSnapshot = await getDocs(roomsQuery);
        const deletePromises = roomsSnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        return { success: true };
    } catch (error) {
        console.error('Error deleting hotel:', error);
        return { success: false, error: error.message };
    }
};

// ==================== ROOM FUNCTIONS ====================

// Get all rooms
export const getRooms = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'rooms'));
        const rooms = [];
        querySnapshot.forEach((doc) => {
            rooms.push({ id: doc.id, ...doc.data() });
        });
        return rooms;
    } catch (error) {
        console.error('Error getting rooms:', error);
        return [];
    }
};

// Get rooms by hotel ID
export const getRoomsByHotelId = async (hotelId) => {
    try {
        const q = query(collection(db, 'rooms'), where('hotelId', '==', hotelId));
        const querySnapshot = await getDocs(q);
        const rooms = [];
        querySnapshot.forEach((doc) => {
            rooms.push({ id: doc.id, ...doc.data() });
        });
        return rooms;
    } catch (error) {
        console.error('Error getting rooms:', error);
        return [];
    }
};

// Get room by ID
export const getRoomById = async (roomId) => {
    try {
        const roomDoc = await getDoc(doc(db, 'rooms', roomId));
        if (roomDoc.exists()) {
            return { id: roomDoc.id, ...roomDoc.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting room:', error);
        return null;
    }
};

// Add room
export const addRoom = async (roomData) => {
    try {
        const docRef = await addDoc(collection(db, 'rooms'), {
            ...roomData,
            createdAt: serverTimestamp()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding room:', error);
        return { success: false, error: error.message };
    }
};

// Update room
export const updateRoom = async (roomId, roomData) => {
    try {
        await updateDoc(doc(db, 'rooms', roomId), {
            ...roomData,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating room:', error);
        return { success: false, error: error.message };
    }
};

// Delete room
export const deleteRoom = async (roomId) => {
    try {
        await deleteDoc(doc(db, 'rooms', roomId));
        return { success: true };
    } catch (error) {
        console.error('Error deleting room:', error);
        return { success: false, error: error.message };
    }
};

// ==================== BOOKING FUNCTIONS ====================

// Get all bookings
export const getBookings = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'bookings'));
        const bookings = [];
        querySnapshot.forEach((doc) => {
            bookings.push({ id: doc.id, ...doc.data() });
        });
        return bookings;
    } catch (error) {
        console.error('Error getting bookings:', error);
        return [];
    }
};

// Get bookings by user ID
export const getBookingsByUserId = async (userId) => {
    try {
        const q = query(collection(db, 'bookings'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const bookings = [];
        querySnapshot.forEach((doc) => {
            bookings.push({ id: doc.id, ...doc.data() });
        });
        return bookings;
    } catch (error) {
        console.error('Error getting bookings:', error);
        return [];
    }
};

// Add booking
export const addBooking = async (bookingData) => {
    try {
        const docRef = await addDoc(collection(db, 'bookings'), {
            ...bookingData,
            bookingDate: serverTimestamp(),
            status: 'confirmed'
        });
        return { success: true, id: docRef.id, ...bookingData };
    } catch (error) {
        console.error('Error adding booking:', error);
        return { success: false, error: error.message };
    }
};

// ==================== INITIALIZATION ====================

// Initialize dummy data (call this once to populate Firestore)
export const initializeFirestoreData = async () => {
    try {
        // Check if data already exists
        const hotelsSnapshot = await getDocs(collection(db, 'hotels'));
        if (!hotelsSnapshot.empty) {
            console.log('Data already initialized');
            return;
        }

        console.log('Initializing Firestore data...');

        // Add hotels
        const hotels = [
            {
                name: 'Grand Plaza Hotel',
                location: 'New York, USA',
                description: 'Experience luxury at its finest in the heart of Manhattan. Our 5-star hotel offers world-class amenities and breathtaking city views.',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                startingPrice: 299,
                amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Parking']
            },
            {
                name: 'Seaside Resort',
                location: 'Miami Beach, USA',
                description: 'Relax and unwind at our beachfront paradise. Enjoy stunning ocean views and premium hospitality.',
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
                startingPrice: 249,
                amenities: ['WiFi', 'Beach Access', 'Pool', 'Restaurant', 'Bar']
            },
            {
                name: 'Mountain View Lodge',
                location: 'Aspen, Colorado',
                description: 'Escape to the mountains and enjoy cozy comfort with spectacular alpine views.',
                image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
                startingPrice: 199,
                amenities: ['WiFi', 'Fireplace', 'Ski Storage', 'Restaurant', 'Hot Tub']
            },
            {
                name: 'Urban Boutique Hotel',
                location: 'San Francisco, USA',
                description: 'Modern design meets classic comfort in the heart of the city.',
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
                startingPrice: 179,
                amenities: ['WiFi', 'Gym', 'Rooftop Bar', 'Parking']
            }
        ];

        const hotelIds = [];
        for (const hotel of hotels) {
            const docRef = await addDoc(collection(db, 'hotels'), hotel);
            hotelIds.push(docRef.id);
        }

        // Add rooms
        const rooms = [
            // Grand Plaza Hotel rooms
            { hotelId: hotelIds[0], type: 'Deluxe Room', price: 299, description: 'Spacious room with king bed and city view', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', capacity: 2 },
            { hotelId: hotelIds[0], type: 'Executive Suite', price: 499, description: 'Luxury suite with separate living area', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', capacity: 4 },
            // Seaside Resort rooms
            { hotelId: hotelIds[1], type: 'Ocean View Room', price: 249, description: 'Beautiful ocean view with private balcony', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', capacity: 2 },
            { hotelId: hotelIds[1], type: 'Beach Villa', price: 399, description: 'Private villa with direct beach access', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', capacity: 4 },
            // Mountain View Lodge rooms
            { hotelId: hotelIds[2], type: 'Cozy Cabin', price: 199, description: 'Rustic charm with mountain views', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800', capacity: 2 },
            { hotelId: hotelIds[2], type: 'Alpine Suite', price: 299, description: 'Luxury suite with fireplace and panoramic views', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', capacity: 3 },
            // Urban Boutique Hotel rooms
            { hotelId: hotelIds[3], type: 'Modern Room', price: 179, description: 'Contemporary design with city views', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800', capacity: 2 },
            { hotelId: hotelIds[3], type: 'Penthouse Suite', price: 349, description: 'Top floor luxury with rooftop access', image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800', capacity: 4 }
        ];

        for (const room of rooms) {
            await addDoc(collection(db, 'rooms'), room);
        }

        console.log('Firestore data initialized successfully!');
        return { success: true };
    } catch (error) {
        console.error('Error initializing data:', error);
        return { success: false, error: error.message };
    }
};
