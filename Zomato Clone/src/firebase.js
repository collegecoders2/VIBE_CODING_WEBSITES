// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQNOgj67Jmu6XAD6lklKt_lGUo_2RDAxQ",
    authDomain: "ecom-web-app-d5007.firebaseapp.com",
    projectId: "ecom-web-app-d5007",
    storageBucket: "ecom-web-app-d5007.firebasestorage.app",
    messagingSenderId: "198120626654",
    appId: "1:198120626654:web:cdf14dbdec6c53a79a254f",
    measurementId: "G-41TL8QX0ZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
