import React, { Component } from "react";

export default class Commssioner extends Component{
  constructor(props){
    super(props);
    this.state = {
      player_first: "",
      player_last: "",
      player_height_in: "",
      player_height_ft: "",
      player_weight_lbs: "",
      origin: "",
      age: "",
    }
    // bind method to the class
    // I'd suggest you use es6 arrow function, that way you don't have to bind "this" (?)
    this.handleCreatePlayerButton = this.handleCreatePlayerButton.bind(this);
    this.handlePlayerFirstChange = this.handlePlayerFirstChange.bind(this);
    this.handlePlayerLastChange = this.handlePlayerLastChange.bind(this);
    this.handlePlayerHtInChange = this.handlePlayerHtInChange.bind(this);
    this.handlePlayerHtFtChange = this.handlePlayerHtFtChange.bind(this);
    this.handlePlayerWtLbChange = this.handlePlayerWtLbChange.bind(this);
    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
  };

  handlePlayerFirstChange(e){
    this.setState({
      player_first:e.target.value,
    })
  }

  handlePlayerLastChange(e){
    this.setState({
      player_last:e.target.value,
    })
  }

  handlePlayerHtInChange(e){
    this.setState({
      player_height_in:e.target.value,
    })
  }

  handlePlayerHtFtChange(e){
    this.setState({
      player_height_ft:e.target.value,
    })
  }

  handlePlayerWtLbChange(e){
    this.setState({
      player_weight_lbs:e.target.value,
    })
  }

  handleOriginChange(e){
    this.setState({
      origin:e.target.value,
    })
  }
  handleAgeChange(e){
    this.setState({
      age:e.target.value,
    })
  }


  handleCreatePlayerButton(event){
    event.preventDefault();
    console.log(this.state)
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
          player_first :this.state.player_first,
          player_last: this.state.player_last,
          player_height_in: this.state.player_height_in,
          player_height_ft: this.state.player_height_ft,
          origin: this.state.origin,
          age: this.state.age
        })
      };
      // fetch request to /api/create-players/
      // once a response is received THEN convert it to JSON
      // THEN print
      fetch('http://127.0.0.1:8000/api/create-players/', requestOptions).then((response)=>
        response.json()
        ).then((data) => console.log(data));
    };

  render(){
    console.log("render commisioner form")
    return (
      <div id='commissioner'>
        
        <h1> this is the Commssioner page </h1>
        <h3> Create Player </h3>
        <div id="message" class=""> </div>

        <form class='form centre'>
        
        <label for="player_first">Player First</label>
        <input type="text" id="player_first" name="first name" placeholder="Enter Firstname" onChange={this.handlePlayerFirstChange}/>

        <label for="player_last">Player Last</label>
        <input type="text" id="player_last" name="player_last name" placeholder="Enter Lastname" onChange={this.handlePlayerLastChange}/>
        
        <label for="player_height_ft"> Height (feet) </label>
        <input type="text" id="player_height_ft" name="height_ft" placeholder="Enter height in feet" onChange={this.handlePlayerHtFtChange}/>
        
        <label for="player_height_in"> Height (inches) </label>
        <input type="text" id="player_height_in" name="height_in" placeholder="Enter height in inches" onChange={this.handlePlayerHtInChange}/>
        
        <label for="player_weight_lbs"> Weight </label>
        <input type="text" id="player_weight_lbs" name="player_weight_lbs" placeholder="Enter weight in lbs" onChange={this.handlePlayerWtLbChange}/>
        
        <label for="age"> Age </label>
        <input type="text" id="age" name="age" placeholder="Enter age" onChange={this.handleAgeChange}/>
        
        <label for="origin"> Origin </label>
        <input type="text" id="origin" name="origin" placeholder="Enter region of origin" onChange={this.handleOriginChange}/>
        
        <button type='submit' placeholder="Create Player" onClick={this.handleCreatePlayerButton}> Create Player</button>
          
        </form>
      </div>
      );
  }
}

{/* */}