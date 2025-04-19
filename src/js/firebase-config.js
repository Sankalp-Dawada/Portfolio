// Using Firebase CDN compatibility version - no imports needed
// We're using the global 'firebase' object from CDN

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyBfmzw8xUyr2IvtKKnPmOQYtZDLQEw8qpM",
  authDomain: "my-portfolio-8ee84.firebaseapp.com",
  projectId: "my-portfolio-8ee84",
  storageBucket: "my-portfolio-8ee84.appspot.com",
  messagingSenderId: "618370244371",
  appId: "1:618370244371:web:86438f25fdabb81d2f04e6",
  measurementId: "G-HTR6YBZBLC"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Export the Firestore instance for use in other modules
const db = firebase.firestore();

export { db };