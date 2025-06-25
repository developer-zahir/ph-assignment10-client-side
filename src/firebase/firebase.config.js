import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB2i0jielT_zcbOaXIs03QQub6k4wTtJCE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "project1-1e356.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "project1-1e356",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "project1-1e356.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "457999902731",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:457999902731:web:96ddfa3f2f3f8c0157ff0e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
