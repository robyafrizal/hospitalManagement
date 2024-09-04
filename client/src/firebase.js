// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hospitalmanagement-8c9c1.firebaseapp.com",
  projectId: "hospitalmanagement-8c9c1",
  storageBucket: "hospitalmanagement-8c9c1.appspot.com",
  messagingSenderId: "690550489874",
  appId: "1:690550489874:web:e6d3ffd66304ad5a4f29cb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
