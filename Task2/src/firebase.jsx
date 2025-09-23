// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBASqvoXJWgqs8hXNWTAcLFjhO8Tk_ToVw',
  authDomain: 'module17-c5259.firebaseapp.com',
  projectId: 'module17-c5259',
  storageBucket: 'module17-c5259.appspot.com',
  messagingSenderId: '765980480024',
  appId: '1:765980480024:web:0a71a4995bda40a4ea696d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
