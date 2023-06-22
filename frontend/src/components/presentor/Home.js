import React, { Component } from "react";

export default class Home extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
    <h1>This is {this.props.name}'s Home page</h1>
    );
  }
}
{/*<h1>this is {this.props.name}'s home page1</h1>*/}