// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtQ4JZJW-f9P1EDlsvbA9yBe0cu7yewGk",
  authDomain: "mycare-f5852.firebaseapp.com",
  projectId: "mycare-f5852",
  storageBucket: "mycare-f5852.appspot.com",
  messagingSenderId: "829184077019",
  appId: "1:829184077019:web:5ae37f9d78c80b7ddb30fe",
  measurementId: "G-8CE8DN7NB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }