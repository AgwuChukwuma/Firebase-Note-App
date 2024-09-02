// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSpSgt7SGCjglsFZ-Kvoj8QhU0i4JmrsI",
  authDomain: "notes-cfc7c.firebaseapp.com",
  projectId: "notes-cfc7c",
  storageBucket: "notes-cfc7c.appspot.com",
  messagingSenderId: "891361324499",
  appId: "1:891361324499:web:da2d4e382482f5de899326",
  measurementId: "G-JGJS7BGLBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);