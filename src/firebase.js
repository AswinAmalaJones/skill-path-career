import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAm4mcPKkaYhzJyu4OqrimMeglxwexu4WI",
  authDomain: "skillpath-ai-4b6f0.firebaseapp.com",
  projectId: "skillpath-ai-4b6f0",
  storageBucket: "skillpath-ai-4b6f0.firebasestorage.app",
  messagingSenderId: "328326405237",
  appId: "1:328326405237:web:8979ce9e76318fcc866c3c",
  measurementId: "G-06QZQCBS3K"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Auth
export const auth = getAuth(app);

// 🗄️ Firestore
export const db = getFirestore(app);

// 📊 Analytics (safe initialization)
let analytics = null;

isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

export { analytics };