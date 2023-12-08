import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


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
  const emailSignup = (email, password) =>{
    return auth.createUserWithEmailAndPassword(email, password);
  };
  // use auth to login
  const login = (email, password) =>{
    return auth.signInWithEmailAndPassword(email, password);
  };
  // use auth to login w/ Google
  const googleLogin = async () => {
    return auth.signInWithPopup(googleProvider);
  };
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
    googleLogin,
    logout,
    emailSignup
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