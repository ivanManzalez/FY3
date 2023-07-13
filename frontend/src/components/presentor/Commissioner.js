import React, { Component } from "react";
import CreatePlayerForm from "./CreatePlayerForm";

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
      message:"",
      classname:"",
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
    this.clearFields = this.clearFields.bind(this);

  };
  
  clearFields(){
    this.setState({
        player_first: "",
        player_last: "",
        player_height_in: "",
        player_height_ft: "",
        player_weight_lbs: "",
        origin: "",
        age: "",
        classname:"",
      });
  }

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
    console.log('this.state = ')
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
      fetch('/api/create-players/', requestOptions // fetch -> then(response) -> then(response.data)
        ).then((response)=>{
          if(response.status === 200){
            this.clearFields();
            this.setState({classname:'good'});
          }
          else{
            this.setState({classname:'bad'});
          }
          return response.json();
        }).then((data) => {
          console.log('data')
        if (data.message) {
          // Display the message to the user
          let message = this.setState({
            message: data.message
          // Clear the form fields
          })
        }
        // Handle other response data
        // data.data
    })
    };

  render(){
    console.log("render commisioner")
    // object destructuring syntax to extract the message property from the this.state object
    return (
      <div id='commissioner'>
        < CreatePlayerForm />
      </div>
      );
  }
}

{/* */}