// Functionality
import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";
import {AuthProvider, useAuth} from "../fireBase/AuthContext";
import {getUserAuthorization} from "./api/user/authorizations"

// Views/Pages
// how to clean this up?
import Home from "./presentor/Home";
import Home2 from "../pages/home/Home2";

import Schedule from "./presentor/Schedule";
import Standings from "./presentor/Standings";
import Stats from "./presentor/Stats";
import Layout from "./navigator/Layout";

// Refactor (!)
import Commissioner from "./presentor/Commissioner";
import Players from "./players/Players";
import Teams from "./teams/Teams";
import Seasons from "./seasons/Seasons";
import Events from "./events/Events";
import DraftWorkflow from "./draft/DraftWorkflow";

// Authentication
import Login from "./auth/Login";
import EmailSignUp from "./auth/EmailSignUp";
import Registration from "./user/Registration";


// Navigation
import PrivateRoute from "./navigator/PrivateRoute";

const App = () => {
  // const {currentUser} = useAuth();

  return (
    <Router>
    <Layout>
    <AuthProvider>
      <Routes>
    {/*
    Private Routes
    - Add any private <Route/> within outer Route component
    */}
        <Route exact path='/commissioner' element={<PrivateRoute />}>
          
          {/*Refactor*/}
          <Route path="/commissioner"         element={< Commissioner  />}/>
          <Route path="/commissioner/players" element={< Players       />}/>
          <Route path="/commissioner/teams"   element={< Teams         />}/>
          <Route path="/commissioner/seasons" element={< Seasons       />}/>
          <Route path="/commissioner/events"  element={< Events        />}/>
          <Route path="/commissioner/draft"   element={< DraftWorkflow />}/>
          
          {/*{currentUser && currentUser.role === 'Commissioner' && (
            <>
              <Route path="/commissioner"         element={< Commissioner  />} />
              <Route path="/commissioner/players" element={< Players       />} />
              <Route path="/commissioner/teams"   element={< Teams         />} />
              <Route path="/commissioner/seasons" element={< Seasons       />} />
              <Route path="/commissioner/events"  element={< Events        />} />
              <Route path="/commissioner/draft"   element={< DraftWorkflow />} />
            </>
          )}*/}
        </Route>
    
    {/*Public Routes*/}
        <Route index             element={< Home2        />}/>       
        <Route path="/login"     element={< Login        />}/>
        <Route path="/signup"    element={< EmailSignUp  />}/>
        <Route path="/register"  element={< Registration />}/>
        <Route path="/schedule"  element={< Schedule     />}/>
        <Route path="/standings" element={< Standings    />}/>
        <Route path="/stats"     element={< Stats        />}/>

    {/***************/}

        
      </Routes>
    </AuthProvider>
    </Layout>
    </Router>
    );
  }

export default App;
