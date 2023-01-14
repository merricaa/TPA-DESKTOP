// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1asWupWqU3mWByQ6R0ENSC2FJklN8oDw",
  authDomain: "tpa-desktop-b6406.firebaseapp.com",
  projectId: "tpa-desktop-b6406",
  storageBucket: "tpa-desktop-b6406.appspot.com",
  messagingSenderId: "800230538671",
  appId: "1:800230538671:web:a4bd934dd9dec4ae5b435a",
  measurementId: "G-7MFKEFC0CN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// export function signIn(email, password){
//   return createUserWithEmailAndPassword(auth, email, password);

// }