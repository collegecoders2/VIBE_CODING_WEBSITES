// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9APBEoQvBCgdFBzuei9aNQN3Bt9rdEA8",
    authDomain: "hotel-booking-2f0f5.firebaseapp.com",
    projectId: "hotel-booking-2f0f5",
    storageBucket: "hotel-booking-2f0f5.firebasestorage.app",
    messagingSenderId: "936202056894",
    appId: "1:936202056894:web:b719274d6cb202a5155aef",
    measurementId: "G-2S5XC6CQX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
