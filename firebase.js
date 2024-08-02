// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeMfCtxZFiPyMa-iIt0l45f_NMhphoHtw",
  authDomain: "inventory-management-a614d.firebaseapp.com",
  projectId: "inventory-management-a614d",
  storageBucket: "inventory-management-a614d.appspot.com",
  messagingSenderId: "85265700008",
  appId: "1:85265700008:web:1ff4bd32aab8feb57ede9d",
  measurementId: "G-LJTFSQHQQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}