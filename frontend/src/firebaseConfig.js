// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// process.env points to .env file

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase - All firebase connections
const app = firebase.initializeApp(firebaseConfig);
// Authentication Provider
export const googleProvider = new firebase.auth.GoogleAuthProvider();
// Authentication instance - All Authentication code
export const auth = app.auth();

// Firebase Root Storage
export const rootStorage = firebase.storage();


//////////////////////////////////////////////////////////// 