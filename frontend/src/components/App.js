import React, { Component } from "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";

// VIEWS or PAGES
// how to clean this up?
import Home from "./presentor/Home";
import Commissioner from "./presentor/Commissioner";
import Schedule from "./presentor/Schedule";
import Standings from "./presentor/Standings";
import Stats from "./presentor/Stats";

// NAV
import Navbar from "./navigator/Bar";

export default class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      // whenever a state is changed, 
      // react rerenders that component
      // Current Season
      // League Leaders (?)
      // Next Event (?)
    }
  }
// pass properties (props) in usr-defined tags
// Add path name to frontend.urls file
  render() {
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home name="larry"/>} />
        <Route path="/commissioner" element={<Commissioner/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/standings" element={<Standings/>} />
        <Route path="/stats" element={<Stats/>} />
      </Routes>
    </Router>
    );
}
}

const appDiv = document.getElementById("app");
render(<App name="larry" />, appDiv);