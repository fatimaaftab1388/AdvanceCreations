import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEzfDsTdqbrx88TibmvnaKm17XA5CcXMw",
    authDomain: "advance-936c9.firebaseapp.com",
    projectId: "advance-936c9",
    storageBucket: "advance-936c9.firebasestorage.app",
    messagingSenderId: "489721734370",
    appId: "1:489721734370:web:bdd4bacdecbb12188c2abb",
    measurementId: "G-BN5WZ7K4BE"
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore & Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
