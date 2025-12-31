import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';

const COLLECTIONS = {
  USERS: 'users',
  TRIPS: 'trips',
  BOOKINGS: 'bookings'
};

// Seed Data
// Seed Data
const SEED_TRIPS = [
  {
    title: 'Romantic Paris Getaway',
    location: 'Paris, France',
    price: 1200,
    image: "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80')",
    description: 'Experience the city of love with a 5-day tour including Eiffel Tower dinner and Louvre access.',
    dates: '10-15 Oct, 2025'
  },
  {
    title: 'Tokyo Tech & Culture',
    location: 'Tokyo, Japan',
    price: 2500,
    image: "url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80')",
    description: 'Dive into the neon streets of Tokyo. Visit Akihabara, Shibuya Crossing and ancient temples.',
    dates: '5-12 Nov, 2025'
  },
  {
    title: 'Bali Beach Retreat',
    location: 'Bali, Indonesia',
    price: 800,
    image: "url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80')",
    description: 'Relax on pristine beaches and explore lush rice terraces. Includes spa treatment.',
    dates: 'Dec 1-7, 2025'
  },
  {
    title: 'New York City Lights',
    location: 'New York, USA',
    price: 1800,
    image: "url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80')",
    description: 'The city that never sleeps. Broadway show, Statue of Liberty, and Central Park tour included.',
    dates: 'Christmas 2025'
  },
  {
    title: 'London Royal Tour',
    location: 'London, UK',
    price: 1500,
    image: "url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80')",
    description: 'Visit Buckingham Palace, Big Ben, and the British Museum.',
    dates: 'Jan 10-15, 2026'
  }
];

export const StorageService = {
  // Initialization
  init: async () => {
    try {
      const tripsRef = collection(db, COLLECTIONS.TRIPS);
      const snapshot = await getDocs(tripsRef);
      if (snapshot.empty) {
        console.log("Seeding trips...");
        for (const trip of SEED_TRIPS) {
          await addDoc(tripsRef, trip);
        }
      }
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  },

  // Users (Auth handled partly here for DB ops)
  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userCredential.user.uid));

    // Auto-create admin if it's the specific email and missing doc
    if (email === 'admin@travel.com' && !userDoc.exists()) {
      const adminData = {
        uid: userCredential.user.uid,
        name: 'Admin User',
        email: 'admin@travel.com',
        role: 'admin'
      };
      await setDoc(doc(db, COLLECTIONS.USERS, userCredential.user.uid), adminData);
      return adminData;
    }

    if (userDoc.exists()) {
      return { uid: userDoc.id, ...userDoc.data() };
    }
    throw new Error('User profile not found');
  },

  signup: async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const role = email === 'admin@travel.com' ? 'admin' : 'user';
    const newUser = {
      uid: userCredential.user.uid,
      name,
      email,
      role
    };
    await setDoc(doc(db, COLLECTIONS.USERS, userCredential.user.uid), newUser);
    return newUser;
  },

  logout: async () => {
    await signOut(auth);
  },

  getUser: async (uid) => {
    const docRef = doc(db, COLLECTIONS.USERS, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { uid: docSnap.id, ...docSnap.data() };
    }
    return null;
  },

  getAllUsers: async () => {
    const snapshot = await getDocs(collection(db, COLLECTIONS.USERS));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  deleteUser: async (id) => {
    await deleteDoc(doc(db, COLLECTIONS.USERS, id));
  },

  // Trips
  getTrips: async () => {
    const snapshot = await getDocs(collection(db, COLLECTIONS.TRIPS));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  getTrip: async (id) => {
    const docRef = doc(db, COLLECTIONS.TRIPS, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  },

  addTrip: async (trip) => {
    await addDoc(collection(db, COLLECTIONS.TRIPS), trip);
  },

  deleteTrip: async (id) => {
    await deleteDoc(doc(db, COLLECTIONS.TRIPS, id));
  },

  resetDefaultTrips: async () => {
    // 1. Get all current trips
    const snapshot = await getDocs(collection(db, COLLECTIONS.TRIPS));

    // 2. Delete them all
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // 3. Add Seed Trips
    for (const trip of SEED_TRIPS) {
      await addDoc(collection(db, COLLECTIONS.TRIPS), trip);
    }
  },

  // Bookings
  addBooking: async (booking) => {
    const bookingData = { ...booking, date: new Date().toISOString() };
    return await addDoc(collection(db, COLLECTIONS.BOOKINGS), bookingData);
  },

  getUserBookings: async (userId) => {
    const q = query(collection(db, COLLECTIONS.BOOKINGS), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch trip details for each booking
    const bookingsWithTrips = await Promise.all(bookings.map(async (b) => {
      const tripSnap = await getDoc(doc(db, COLLECTIONS.TRIPS, b.tripId));
      return {
        ...b,
        trip: tripSnap.exists() ? { id: tripSnap.id, ...tripSnap.data() } : { title: 'Unknown Trip', image: '' }
      };
    }));

    return bookingsWithTrips.reverse();
  },

  getAllBookings: async () => {
    const snapshot = await getDocs(collection(db, COLLECTIONS.BOOKINGS));
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const bookingsWithTrips = await Promise.all(bookings.map(async (b) => {
      const tripSnap = await getDoc(doc(db, COLLECTIONS.TRIPS, b.tripId));
      return {
        ...b,
        trip: tripSnap.exists() ? { id: tripSnap.id, ...tripSnap.data() } : { title: 'Unknown Trip', image: '' }
      };
    }));

    return bookingsWithTrips.reverse();
  },

  clearAll: async () => {
    // Intentionally disabled for Firebase to prevent accidental wipe of shared DB
    console.warn("Reset not supported in cloud mode to protect data.");
    alert("Reset not supported in cloud mode.");
  }
};
