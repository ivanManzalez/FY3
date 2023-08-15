// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// process.env points to .env file 
const firebaseConfig = {
  apiKey: "AIzaSyA_Lob1tae59W6fbcG9xw3EoU-IfU_4uVg",
  authDomain: "fy3-official.firebaseapp.com",
  projectId: "fy3-official",
  storageBucket: "fy3-official.appspot.com",
  messagingSenderId: "384403007990",
  appId: "1:384403007990:web:118929a6729b9e1fb1ffd7",
  measurementId: "G-DPDJ8CY8CT"
  // apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  // appId: process.env.REACT_APP_FIREBASE_APPID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// Authentication instance
export const auth = app.auth() ;
// Firebase Instance
export default app;