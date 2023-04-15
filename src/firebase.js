// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApazuUwFXB2FTVt-dZoPxsHS2kezuTdKU",
  authDomain: "registrations-e7cbe.firebaseapp.com",
  projectId: "registrations-e7cbe",
  storageBucket: "registrations-e7cbe.appspot.com",
  messagingSenderId: "591431585127",
  appId: "1:591431585127:web:47f24ae232caf8018633c2",
  measurementId: "G-4LBB8E0E3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
