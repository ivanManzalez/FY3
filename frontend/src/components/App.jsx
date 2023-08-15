import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";

// Authentication

// VIEWS or PAGES
// how to clean this up?
import Home from "./presentor/Home";
import Commissioner from "./presentor/Commissioner";
import Schedule from "./presentor/Schedule";
import Standings from "./presentor/Standings";
import Stats from "./presentor/Stats";
import Api from "./presentor/Api";
import PlayerProfile from "./presentor/PlayerProfile";

// Authentication
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import {AuthProvider} from "../contexts/AuthContext";

// NAV
import Navbar from "./navigator/Bar";
import PrivateRoute from "./navigator/PrivateRoute";
import {useAuth} from "../contexts/AuthContext";

const App = () => {
  // move to nav bar? 
  const {currentUser, logout} = useAuth();

  return (

    <Router>
    <Navbar /> {/*<Navbar currentUser={currentUser}/>*/}
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<Home name="Larry"/>} />
        {/*<Route path="/playerprofile/:playerID" element={<PlayerProfile/>} />*/}
        {/*<Route path="/commissioner" element={<PrivateRoute component={<Commissioner />} requiredPermission="is_commissioner" />} />*/}
      </Routes>
    </AuthProvider>
    </Router>
    );
  }

const appDiv = document.getElementById("app");
render(<App />, appDiv);

//
  {/*
  <Route path="/standings" element={<Standings/>} />
  <Route path="/api/players" element={<Api/>}/>
  <Route path="/schedule" element={<Schedule/>} />
  <Route path="/stats" element={<Stats/>} />*/}
        