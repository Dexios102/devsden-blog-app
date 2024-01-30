// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: "devsden-3963d.appspot.com",
  messagingSenderId: "530940156498",
  appId: "1:530940156498:web:8bee48fa34a3659d02dd8b",
  measurementId: "G-JTEL3GFZR3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
