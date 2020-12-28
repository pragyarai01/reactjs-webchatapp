import {Component} from "react";
import React from "react";
import  Cardcomponent  from "./Cardcomponent";

class Messages extends Component {
  componentDidMount() {
    console.log("messagesss",this.props)
  }
  renderDialog(){
    if(this.props.navigation!== undefined && this.props.navigation.showinfo === true){
     // return <Dialog navigation = {this.props.navigation} />
       return <Cardcomponent navigation = {this.props.navigation} />
     }
  }
  render() {
    const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
        {this.renderDialog()}
      </ul>
    ); 
  }
  renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = this.props;
    console.log("MEMBER",member)
    console.log("CMEMBER",currentMember)
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className}>
        <span
          className="avatar"
          //style={{backgroundColor: member.clientData.color}}
          style={{backgroundColor: member.color}}
        />
        <div className="Message-content">
          <div className="username">
            {/* {member.clientData.username} */}
            {member.username}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;