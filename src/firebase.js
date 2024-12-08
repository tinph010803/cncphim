// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCChT2yFEUp0fD6sKUPEGEAURsDiShJUHg",
  authDomain: "cncphim.firebaseapp.com",
  projectId: "cncphim",
  storageBucket: "cncphim.firebasestorage.app",
  messagingSenderId: "185956389702",
  appId: "1:185956389702:web:2c1a8600ddf8d84ff5cb47",
  measurementId: "G-4PXZZ1LK11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
