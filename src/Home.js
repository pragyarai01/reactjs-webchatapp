import React, { Component } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";
//import Mileage from './Mileage';

class Home extends Component {
  state = {
    messages: [
      {
        text: "This is a test message!",
        member: {
          color: "blue",
          username: "bluemoon",
          id:0
        }
      }
    ],
    member: {
      username: "you",
      color: '#ff4500',
      id: 1
    }
  }
  componentDidMount() {
    console.log(this.props)
  }

  onSendMessage = (message) => {
    const messages = this.state.messages
    messages.push({
      text: message,
      member: this.state.member
    })
    this.setState({messages: messages})
  }
  
  render(){
  return (
    <div className="App" >
      <div className="App-header">
        <h1>Chat App</h1>
      </div>
      <Messages
        messages={this.state.messages}
        currentMember={this.state.member}
        navigation={this.props.location.state}
      />
      <Input
        onSendMessage={this.onSendMessage}
        navigation={this.props.location.state}
      />
       </div>

    
  );}
}


export default Home;
