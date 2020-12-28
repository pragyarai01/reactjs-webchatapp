import {Component} from "react";
import React from "react";
import add from './add.png'
import cancel from './cancel.png';
import Mileage from './Mileage';
//import history from './history';
//import Dialog from "./Dialog";
import  Cardcomponent  from "./Cardcomponent";

class Input extends Component {
  state = {
    text: "",
    showplus : false,
    showform : false
  }
  componentDidMount() {
    console.log("input",this.props)
  }

  onChange(e) {
    this.setState({text: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    if(this.state.text !== ""){
    this.props.onSendMessage(this.state.text);
    }
  }

  onClick(e){
    e.preventDefault();
    this.setState({showplus: !this.state.showplus, showform : !this.state.showform})
    console.log("showplus",this.state.showplus)
    console.log("showform",this.state.showform)
  }
  renderForm () {
      console.log("in renderform",this.state.showform)
    return <Mileage />
 }
  renderDialog(){
    if(this.props.navigation!== undefined && this.props.navigation.showinfo === true){
     // return <Dialog navigation = {this.props.navigation} />
       return <Cardcomponent navigation = {this.props.navigation} />
     }
  }

  render() {
    return (
      <div className="Input">
          {this.state.showform && this.renderForm()}
          {/* {this.renderDialog()} */}
        <form id="input-form" onSubmit={e => this.onSubmit(e)}>

          <img src={!this.state.showplus ? add : cancel} alt='some value' onClick={(e) =>this.onClick(e)} />
          {/* <img src={!this.state.showplus ? add : cancel} alt='some value' onClick={() => history.push('/form',{showplus:true})} /> */}
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autofocus="true"
          />
          <button onClick={e => this.onSubmit(e)}>Send</button>
        </form>
        
      </div>
    );
  }
}

export default Input;