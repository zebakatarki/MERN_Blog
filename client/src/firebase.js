// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// console.log(import.meta.env.VITE_FIREBASE_API_KEY);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-14240.firebaseapp.com",
  projectId: "mern-blog-14240",
  storageBucket: "mern-blog-14240.appspot.com",
  messagingSenderId: "597541279706",
  appId: "1:597541279706:web:54b72c7b55722d1aa7d2e3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

