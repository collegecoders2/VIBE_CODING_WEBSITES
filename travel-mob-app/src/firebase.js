import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCCoejdaeReQbGzpcKs4KsIbHRL982JzlM",
    authDomain: "travel-mob-app.firebaseapp.com",
    projectId: "travel-mob-app",
    storageBucket: "travel-mob-app.firebasestorage.app",
    messagingSenderId: "759682964434",
    appId: "1:759682964434:web:46fdda2347a75f44da460b",
    measurementId: "G-XECTGWZSME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
