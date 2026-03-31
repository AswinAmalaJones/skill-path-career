import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 PASTE YOUR FIREBASE CONFIG HERE
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm4mcPKkaYhzJyu4OqrimMeglxwexu4WI",
  authDomain: "skillpath-ai-4b6f0.firebaseapp.com",
  projectId: "skillpath-ai-4b6f0",
  storageBucket: "skillpath-ai-4b6f0.firebasestorage.app",
  messagingSenderId: "328326405237",
  appId: "1:328326405237:web:8979ce9e76318fcc866c3c",
  measurementId: "G-06QZQCBS3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Auth (Login / Register / Forgot password)
export const auth = getAuth(app);

// 🗄️ Firestore (User data)
export const db = getFirestore(app);
