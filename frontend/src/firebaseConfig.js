// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_Lob1tae59W6fbcG9xw3EoU-IfU_4uVg",
  authDomain: "fy3-official.firebaseapp.com",
  projectId: "fy3-official",
  storageBucket: "fy3-official.appspot.com",
  messagingSenderId: "384403007990",
  appId: "1:384403007990:web:118929a6729b9e1fb1ffd7",
  measurementId: "G-DPDJ8CY8CT"
};

// // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize firebase Authentication and get a reference to service
const auth = getAuth(firebaseApp);
const anal = getAnalytics(firebaseApp);

// export default firebaseConfig;