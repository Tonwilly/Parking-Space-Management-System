// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcqo6SVOWsp_pODV5SNL1cE4sJOQ9CGTw",
  authDomain: "parking-space-ms-124e4.firebaseapp.com",
  projectId: "parking-space-ms-124e4",
  storageBucket: "parking-space-ms-124e4.firebasestorage.app",
  messagingSenderId: "1027081372502",
  appId: "1:1027081372502:web:2acc51fac52834025eccf7",
  measurementId: "G-HSLBEHKXJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);