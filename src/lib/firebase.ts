import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  reload,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

// User's explicitly provided PollBee Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAzzAvMQBMTvKXUNXWWYgoRHHiTlFzjyI4",
  authDomain: "snappoint-5baba.firebaseapp.com",
  projectId: "snappoint-5baba",
  storageBucket: "snappoint-5baba.firebasestorage.app",
  messagingSenderId: "976608408621",
  appId: "1:976608408621:web:46b054cacfbf1c4312b4a4",
  measurementId: "G-1DQ2DNRVW1",
  firestoreDatabaseId: ""
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

// Safe Analytics Initialization
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  reload,
  signOut, 
  onAuthStateChanged,
  updateProfile,
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  onSnapshot,
  serverTimestamp
};

