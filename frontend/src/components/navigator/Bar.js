import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Bar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
    <nav id="nav">
      <ul>
        <li><Link exact to="/">Home</Link></li>
        <li><Link to="/commissioner">Commissioner</Link></li>
        <li><Link to="/standings">Standings</Link></li>
        <li><Link to="/stats">Stats</Link></li>
        <li><Link to="/schedule">Schedule</Link></li>
        <li><a href="http://127.0.0.1:8000/players/player">API</a></li>
      </ul>
    </nav>
    );
  }
}
