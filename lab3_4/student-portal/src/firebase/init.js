// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClvPuiJuiK9fAZuRQEJ8lioYBVYkG4FW0",
  authDomain: "piw-l-73604.firebaseapp.com",
  projectId: "piw-l-73604",
  storageBucket: "piw-l-73604.appspot.com",
  messagingSenderId: "993736219680",
  appId: "1:993736219680:web:36d24cb1f58afbec2ef045",
  measurementId: "G-5QZERD26PS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
