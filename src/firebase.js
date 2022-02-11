// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmeCMO6TKJ9WVt6hrSORHLAl_A2xMoSjI",
  authDomain: "contactmanager-dc3bc.firebaseapp.com",
  projectId: "contactmanager-dc3bc",
  storageBucket: "contactmanager-dc3bc.appspot.com",
  messagingSenderId: "256817386116",
  appId: "1:256817386116:web:a6552e2e4490f8e32628d1",
  measurementId: "G-VWVSTTVJ71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();