import React, { createContext, useContext, useEffect, useState } from 'react';
<<<<<<< HEAD
import { auth, googleProvider } from '../firebaseConfig';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
=======
// import firebase from 'firebase/app';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
>>>>>>> dev

// Create a context - to be used inside of Provider
const AuthContext = createContext();

// Custom hook to access the authentication context
const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component that provides the context data
const AuthProvider = ({ children }) => {
  // Use firebase.auth module to set the current user
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // If firebase no longer wanted, can change return to use different authentication
  // use auth to sign up
  const signup = (email, password) =>{
    return auth.createUserWithEmailAndPassword(email, password);
  };
  // use auth to login
  const login = (email, password) =>{
    return auth.signInWithEmailAndPassword(email, password);
  };
<<<<<<< HEAD
  // use auth to login w/ Google
  const googleLogin = async () => {
    return auth.signInWithPopup(googleProvider);
  };
=======
>>>>>>> dev
  // use auth to logout
  const logout = () =>{
    return auth.signOut();
  };

  // set current user when we mount component - not in during any render
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setCurrentUser(authUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // set value = current user & pass to <AuthContext.Provider>
  const value = {
    currentUser,
    login,
<<<<<<< HEAD
    googleLogin,
=======
>>>>>>> dev
    logout,
    signup
  }
  // if we are not loading, then dont render children 
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export {useAuth};
export {AuthProvider};