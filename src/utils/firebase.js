// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJjYueouIQzDwMS0U0Py6IRwXmw0-y4O8",
  authDomain: "netflixgpt-e84c2.firebaseapp.com",
  projectId: "netflixgpt-e84c2",
  storageBucket: "netflixgpt-e84c2.appspot.com",
  messagingSenderId: "417635131820",
  appId: "1:417635131820:web:bfb74c03047e48aa7eda09",
  measurementId: "G-WD4E5CKHYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
