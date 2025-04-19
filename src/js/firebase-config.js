import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Using Firebase CDN compatibility version
const firebaseConfig = {
  apiKey: "AIzaSyBfmzw8xUyr2IvtKKnPmOQYtZDLQEw8qpM",
  authDomain: "my-portfolio-8ee84.firebaseapp.com",
  projectId: "my-portfolio-8ee84",
  storageBucket: "my-portfolio-8ee84.appspot.com",
  messagingSenderId: "618370244371",
  appId: "1:618370244371:web:86438f25fdabb81d2f04e6",
  measurementId: "G-HTR6YBZBLC"
};

// Initialize Firebase with compat version
firebase.initializeApp(firebaseConfig);


// Export the Firestore instance
const db = firebase.firestore();

export { db };