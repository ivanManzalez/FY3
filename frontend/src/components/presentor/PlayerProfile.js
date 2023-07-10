import React, {Component} from 'react';
import { useParams } from 'react-router-dom';

export default class PlayerProfile extends Component{

  constructor(props){
    super(props);
    this.state = {
      player_first: "",
      player_last : "",
      player_height : "",
      player_age : "",
    };
    const { playerID } = useParams();
  }
  render(){
    return 
    <div id="profile">
      <h1>Player Profile</h1>
      {/*<h2>{this.player_Id}</h2>*/}
      <p>Name: {this.state.player_first} {this.state.player_last}</p>
      <p>Height: {this.state.player_height} </p>
      <p>Age: {this.state.Age}</p>

      <p>IG: TODO</p>
      <p>TW: TODO</p>
      <p>SC: TODO</p>
    </div>
  }
}