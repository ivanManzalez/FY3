// Functionality
import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";
import {AuthProvider} from "../contexts/AuthContext";
// Views/Pages
// how to clean this up?
import Home from "./presentor/Home";
import Commissioner from "./presentor/Commissioner";

// Authentication
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

// Navigation
import Navbar from "./navigator/Bar";
import PrivateRoute from "./navigator/PrivateRoute";

const App = () => {

  return (
    <Router>
    <Navbar />
    <AuthProvider>
      <Routes>
    {/*
    Private Routes
    - Add any private <Route/> within outter Route component
    */}
        <Route exact path='/' element={<PrivateRoute />}>
          <Route index element={<Home name="Larry"/>}/>
          <Route path="/commissioner" element={<Commissioner />}/>
        </Route>
    
    {/*Public Routes*/}       
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

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