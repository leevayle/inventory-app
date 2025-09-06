// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjH63bBuqv9yW7bILuseW3RX7Owdek5aM",
  authDomain: "inventory-846e6.firebaseapp.com",
  projectId: "inventory-846e6",
  storageBucket: "inventory-846e6.firebasestorage.app",
  messagingSenderId: "57334355052",
  appId: "1:57334355052:web:068dfa6cd598bad4a83449",
  measurementId: "G-9QWR10TBGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export auth for use in components