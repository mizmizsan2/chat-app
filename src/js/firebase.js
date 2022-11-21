// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYNaQB72ABpFHidoDCg4Rzkz7PQyYkOzA",
  authDomain: "softwaredev-a7e20.firebaseapp.com",
  projectId: "softwaredev-a7e20",
  storageBucket: "softwaredev-a7e20.appspot.com",
  messagingSenderId: "387741819926",
  appId: "1:387741819926:web:20c757a05d142c56590137"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp)